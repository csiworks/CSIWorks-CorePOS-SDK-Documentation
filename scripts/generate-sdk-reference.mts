// Builds the /sdk-reference docs section from Dokka's GFM output: consolidates
// Dokka's one-page-per-member layout into one page per public type.
//
// Usage: gradlew :sdk:dokkaGfm in the SDK repo, then: npm run gen-sdk-docs
// SDK_REPO overrides the Android SDK project location.
import {rmSync, existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, statSync} from 'node:fs';
import {join, dirname, resolve, basename} from 'node:path';
import {fileURLToPath} from 'node:url';

interface TypeInfo {
  pkg: string;
  name: string;
  dir: string;
  owner: string;
}

interface Pkg {
  pkgName: string;
  suffix: string;
  slug: string;
  dir: string;
  types: string[];
}

type Block = {type: 'para' | 'code' | 'item'; text: string};
type Sections = Record<string, string[]>;

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sdkRepo = process.env.SDK_REPO ?? join(siteRoot, 'CSIWorks-CorePOS-SDK', 'android');
const dokkaOut = join(sdkRepo, 'sdk', 'build', 'dokka', 'gfm');
const target = join(siteRoot, 'sdk-reference');

const PKG_PREFIX = 'com.coreposnow.sdk';
// Sidebar order of package folders (suffix after com.coreposnow.sdk).
const PKG_ORDER = ['connector', 'inventory', 'order', 'payment', 'tender', 'action', 'merchant', 'scanner', 'tokens', 'pagination', 'common', 'common.exception', 'utils'];

if (!existsSync(dokkaOut)) {
  console.error(`Dokka output not found at ${dokkaOut}. Run "gradlew :sdk:dokkaGfm" in the SDK repo first.`);
  process.exit(1);
}

const moduleDir = readdirSync(dokkaOut).find((d) => statSync(join(dokkaOut, d)).isDirectory());
if (!moduleDir) {
  console.error(`No module directory found in ${dokkaOut}.`);
  process.exit(1);
}
const moduleRoot = join(dokkaOut, moduleDir);

// ---------- generic helpers ----------

const kebab = (s: string): string => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const unescapeEntities = (s: string): string =>
  s
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&')
    // AIDL-generated interfaces are not on Dokka's analysis classpath
    .replaceAll('<Error class: unknown class>', '…');

const escapeForTable = (s: string): string => s.replaceAll('|', '\\|');

function readLines(file: string): string[] {
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .filter((l) => !l.startsWith('//['))
    .filter((l) => {
      const t = l.trim();
      return t !== '[androidJvm]\\' && t !== '[androidJvm]' && t !== 'androidJvm';
    });
}

// Splits a markdown file into {intro, sections: {heading: lines}} at ## / #### headings.
function splitSections(lines: string[]): {intro: string[]; sections: Sections} {
  const sections: Sections = {};
  let current: string | null = null;
  const intro: string[] = [];
  for (const line of lines) {
    const m = line.match(/^(?:##|####) (.+)$/);
    if (m) {
      current = m[1].trim();
      sections[current] = [];
    } else if (current) {
      sections[current].push(line);
    } else {
      intro.push(line);
    }
  }
  return {intro, sections};
}

function parseTable(lines: string[]): string[][] {
  const rows: string[][] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('|')) continue;
    if (/^\|[\s|:-]*$/.test(t)) continue; // header separator / empty header
    const cells = t.slice(1, -1).split('|').map((c) => c.trim());
    if (cells.every((c) => c === '')) continue;
    rows.push(cells);
  }
  return rows;
}

// ---------- first pass: map every Dokka type dir to an output page ----------

const typeMap = new Map<string, TypeInfo>();
const packages: Pkg[] = [];

function firstHeading(file: string): string | null {
  if (!existsSync(file)) return null;
  const m = readFileSync(file, 'utf8').match(/^# (.+)$/m);
  return m?.[1]?.trim() ?? null;
}

for (const pkgName of readdirSync(moduleRoot).filter((d) => statSync(join(moduleRoot, d)).isDirectory())) {
  const pkgDir = join(moduleRoot, pkgName);
  const suffix = pkgName.replace(`${PKG_PREFIX}.`, '');
  const slug = suffix.replaceAll('.', '-');
  const types: string[] = [];
  const registerTypeDir = (dir: string, pageOwnerDir: string | null): void => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (!statSync(p).isDirectory() || entry === '-companion') continue;
      const owner = pageOwnerDir ?? p; // nested types render on their top-level type's page
      if (!pageOwnerDir) types.push(p);
      const name = firstHeading(join(p, 'index.md')) ?? entry;
      typeMap.set(resolve(p), {pkg: pkgName, name, dir: p, owner: resolve(owner)});
      registerTypeDir(p, owner);
    }
  };
  registerTypeDir(pkgDir, null);
  packages.push({pkgName, suffix, slug, dir: pkgDir, types});
}

// Output path for a top-level type dir.
function outDocPath(typeDir: string): string {
  const info = typeMap.get(resolve(typeDir))!;
  const ownerInfo = typeMap.get(info.owner)!;
  const pkg = packages.find((p) => p.pkgName === ownerInfo.pkg)!;
  return `${pkg.slug}/${kebab(ownerInfo.name)}.md`;
}

// ---------- link handling ----------

// Resolves a Dokka-internal href (relative to sourceDir) to a link on the generated
// pages, or null when the target has no page (then we keep plain text).
function resolveHref(sourceDir: string, href: string, currentOutFile: string): string | null {
  const [pathPart, anchor] = href.split('#');
  if (anchor !== undefined) return null; // Dokka's synthetic anchors don't exist on our pages
  let abs = resolve(sourceDir, pathPart);
  let memberAnchor = '';
  if (abs.endsWith('index.md')) {
    abs = dirname(abs);
  } else if (abs.endsWith('.md')) {
    // Member file: link to the type page. Only functions get their own headings
    // (properties render in a table), so only they have an anchor to point at.
    if (memberIsFunction(abs)) memberAnchor = '#' + basename(abs, '.md').replaceAll('-', '');
    abs = dirname(abs);
  }
  const info = typeMap.get(abs);
  if (!info) return null;
  const targetDoc = outDocPath(info.dir);
  if (targetDoc === currentOutFile) return memberAnchor || null;
  // relative link between generated docs
  const fromDir = dirname(currentOutFile);
  const rel = relPath(fromDir, targetDoc);
  return rel + memberAnchor;
}

const memberKindCache = new Map<string, boolean>();
function memberIsFunction(absFile: string): boolean {
  let cached = memberKindCache.get(absFile);
  if (cached === undefined) {
    cached = false;
    if (existsSync(absFile)) {
      const {intro} = splitSections(readLines(absFile));
      const {signature} = extractSignatureAndDescription(intro);
      cached = /^fun\b/.test(signature.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim());
    }
    memberKindCache.set(absFile, cached);
  }
  return cached;
}

function relPath(fromDir: string, toFile: string): string {
  const from = fromDir === '.' ? [] : fromDir.split('/');
  const to = toFile.split('/');
  while (from.length && to.length > 1 && from[0] === to[0]) {
    from.shift();
    to.shift();
  }
  return '../'.repeat(from.length) + to.join('/');
}

// Cleans inline markdown: resolves/strips links, unescapes entities, and
// backslash-escapes MDX-hostile characters outside inline code spans.
function cleanInline(text: string, sourceDir: string, currentOutFile: string): string {
  const linked = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (full, label: string, href: string) => {
    if (/^https?:/.test(href)) return full;
    const resolved = resolveHref(sourceDir, href, currentOutFile);
    return resolved ? `[${label}](${resolved})` : label;
  });
  return unescapeEntities(linked)
    .split('`')
    .map((seg, i) => (i % 2 ? seg : seg.replaceAll('<', '\\<').replaceAll('{', '\\{')))
    .join('`');
}

// Cleans a signature into plain Kotlin and wraps long parameter lists.
function cleanSignature(text: string): string {
  const plain = unescapeEntities(text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')).trim();
  if (plain.length <= 100) return plain;
  const open = plain.indexOf('(');
  if (open === -1) return plain;
  const close = findMatching(plain, open);
  if (close === -1) return plain;
  const params = splitTopLevel(plain.slice(open + 1, close));
  if (params.length < 2) return plain;
  return `${plain.slice(0, open + 1)}\n    ${params.join(',\n    ')}\n)${plain.slice(close + 1)}`;
}

function findMatching(s: string, openIdx: number): number {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    if (s[i] === '(') depth++;
    else if (s[i] === ')' && --depth === 0) return i;
  }
  return -1;
}

function splitTopLevel(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if ('(<['.includes(ch)) depth++;
    else if (')>]'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

// ---------- summary-cell parsing (Dokka packs "decl<br>description" into cells) ----------

function parseSummaryCell(cell: string): {decl: string; desc: string} {
  const parts = cell
    .split('<br>')
    .map((p) => p.trim())
    .filter((p) => p && p !== '[androidJvm]');
  const declIdx = parts.findIndex((p) =>
    /^(const val|val|var|fun|enum|class|data class|sealed class|abstract class|open class|object|interface|constructor|annotation class)\b|^\[/.test(p),
  );
  const decl = declIdx >= 0 ? parts[declIdx] : '';
  const desc = parts.slice(declIdx + 1).join(' ');
  return {decl, desc};
}

// Extracts "Type" from a cleaned declaration like "val name: List<Charge>? = null".
function declType(decl: string): string {
  const m = decl.match(/:\s*(.+)$/);
  if (!m) return '';
  return m[1].replace(/\s*=\s*[^=]*$/, '').trim();
}

// ---------- rendering ----------

// Splits body text into blocks, keeping fenced code (KDoc examples) and list
// items verbatim instead of joining them into paragraphs.
function toBlocks(body: string[]): Block[] {
  const blocks: Block[] = [];
  let cur: string[] = [];
  let fence: string[] | null = null;
  const flush = (): void => {
    if (cur.length) blocks.push({type: 'para', text: cur.join(' ')});
    cur = [];
  };
  for (const line of body) {
    if (line.trim().startsWith('```')) {
      if (fence === null) {
        flush();
        fence = [line];
      } else {
        fence.push(line);
        blocks.push({type: 'code', text: fence.join('\n')});
        fence = null;
      }
      continue;
    }
    if (fence !== null) {
      fence.push(line);
      continue;
    }
    if (line.trim() === '') flush();
    else if (/^\s*([-*]|\d+\.)\s/.test(line)) blocks.push({type: 'item', text: line.trimEnd()});
    else cur.push(line.trim());
  }
  if (fence !== null) blocks.push({type: 'code', text: fence.join('\n')});
  flush();
  return blocks;
}

function renderBlocks(blocks: Block[], sourceDir: string, outFile: string): string {
  let out = '';
  for (const b of blocks) {
    if (b.type === 'code') out += b.text + '\n\n';
    else if (b.type === 'item') out += cleanInline(b.text, sourceDir, outFile) + '\n';
    else out += cleanInline(b.text, sourceDir, outFile) + '\n\n';
  }
  return out;
}

function extractSignatureAndDescription(lines: string[]): {signature: string; description: Block[]} {
  // after "# Name": first paragraph = signature, following blocks = description
  const body: string[] = [];
  let seenTitle = false;
  for (const line of lines) {
    if (/^# /.test(line)) {
      seenTitle = true;
      continue;
    }
    if (seenTitle) body.push(line);
  }
  const blocks = toBlocks(body);
  const sigIdx = blocks.findIndex((b) => b.type === 'para');
  return {
    signature: sigIdx === -1 ? '' : blocks[sigIdx].text,
    description: blocks.filter((_, i) => i !== sigIdx),
  };
}

// Renders KDoc tag sections beyond params/return/throws: @see, @since, @author,
// and deprecation notices.
function renderExtraSections(sections: Sections, sourceDir: string, outFile: string): string {
  let out = '';
  const joined = (name: string): string => (sections[name] ?? []).map((l) => l.trim()).filter(Boolean).join(' ');

  const deprecated = joined('Deprecated');
  if (deprecated) out += `:::warning[Deprecated]\n\n${cleanInline(deprecated, sourceDir, outFile)}\n\n:::\n\n`;

  const seeRows = parseTable(sections['See also'] ?? []).filter((r) => (r[0] ?? '').trim());
  if (seeRows.length) {
    out += '**See also:**\n\n';
    for (const row of seeRows) {
      const ref = cleanInline(row[0] ?? '', sourceDir, outFile);
      const note = cleanInline(row[1] ?? '', sourceDir, outFile);
      out += note ? `- ${ref} — ${note}\n` : `- ${ref}\n`;
    }
    out += '\n';
  }

  const since = joined('Since');
  if (since) out += `**Since:** ${cleanInline(since, sourceDir, outFile)}\n\n`;

  const author = joined('Author');
  if (author) out += `**Author:** ${cleanInline(author, sourceDir, outFile)}\n\n`;

  return out;
}

function renderFunction(file: string, outFile: string, headingLevel: number): string {
  const lines = readLines(file);
  const name = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? basename(file, '.md');
  const {intro, sections} = splitSections(lines);
  const {signature, description} = extractSignatureAndDescription(intro);
  const dir = dirname(file);
  const h = '#'.repeat(headingLevel);

  let out = `${h} ${name}\n\n`;
  if (signature) out += '```kotlin\n' + cleanSignature(signature) + '\n```\n\n';
  out += renderBlocks(description, dir, outFile);

  const params = parseTable(sections['Parameters'] ?? []);
  if (params.length) {
    out += '| Parameter | Description |\n|---|---|\n';
    for (const row of params) {
      const nameCell = cleanInline(row[0] ?? '', dir, outFile);
      const descCell = cleanInline(row[1] ?? '', dir, outFile);
      out += `| \`${nameCell}\` | ${escapeForTable(descCell)} |\n`;
    }
    out += '\n';
  }

  const ret = (sections['Return'] ?? []).map((l) => l.trim()).filter(Boolean).join(' ');
  if (ret) out += `**Returns:** ${cleanInline(ret, dir, outFile)}\n\n`;

  const throws = parseTable(sections['Throws'] ?? []);
  if (throws.length) {
    out += '| Throws | When |\n|---|---|\n';
    for (const row of throws) {
      out += `| \`${unescapeEntities((row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'))}\` | ${escapeForTable(cleanInline(row[1] ?? '', dir, outFile))} |\n`;
    }
    out += '\n';
  }

  out += renderExtraSections(sections, dir, outFile);
  return out;
}

const ENUM_NOISE_FUNCTIONS = new Set(['value-of.md', 'values.md', 'entries.md']);

function renderType(typeDir: string, outFile: string, headingLevel: number): {name: string; markdown: string} {
  const indexFile = join(typeDir, 'index.md');
  const lines = readLines(indexFile);
  const name = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? basename(typeDir);
  const {intro, sections} = splitSections(lines);
  const {signature, description} = extractSignatureAndDescription(intro);
  const isEnum = /(^|\s)enum /.test(unescapeEntities(signature.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')));
  const h = '#'.repeat(headingLevel);
  const hh = '#'.repeat(headingLevel + 1);

  let out = headingLevel === 1 ? '' : `${h} ${name}\n\n`;
  if (signature) out += '```kotlin\n' + cleanSignature(signature) + '\n```\n\n';
  out += renderBlocks(description, typeDir, outFile);
  out += renderExtraSections(sections, typeDir, outFile);

  // constructor parameters documented at class level (via @param)
  const ctorParams = parseTable(sections['Parameters'] ?? []);
  if (ctorParams.length) {
    out += '| Constructor parameter | Description |\n|---|---|\n';
    for (const row of ctorParams) {
      out += `| \`${cleanInline(row[0] ?? '', typeDir, outFile)}\` | ${escapeForTable(cleanInline(row[1] ?? '', typeDir, outFile))} |\n`;
    }
    out += '\n';
  }

  if (isEnum) {
    const entries = parseTable(sections['Entries'] ?? []);
    if (entries.length) {
      out += `${hh} Entries\n\n| Entry | Description |\n|---|---|\n`;
      for (const row of entries) {
        const entryName = (row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
        const {desc} = parseSummaryCell(row[1] ?? '');
        out += `| \`${entryName}\` | ${escapeForTable(cleanInline(desc, typeDir, outFile))} |\n`;
      }
      out += '\n';
    }
  }

  const props = parseTable(sections['Properties'] ?? []).filter((row) => {
    const href = row[0]?.match(/\]\(([^)]+)\)/)?.[1] ?? '';
    if (!href || href.includes('#')) return false; // skip inherited members (linked via anchors)
    // skip Kotlin's synthetic enum companion property
    if (isEnum && /\[entries\]/.test(row[0] ?? '')) return false;
    return true;
  });
  if (props.length) {
    out += `${hh} Properties\n\n| Name | Type | Description |\n|---|---|---|\n`;
    for (const row of props) {
      const propName = (row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
      const {decl, desc} = parseSummaryCell(row[1] ?? '');
      const type = declType(unescapeEntities(decl.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')));
      out += `| \`${propName}\` | \`${escapeForTable(type)}\` | ${escapeForTable(cleanInline(desc, typeDir, outFile))} |\n`;
    }
    out += '\n';
  }

  const fnRows = parseTable(sections['Functions'] ?? []);
  const fnFiles: string[] = [];
  for (const row of fnRows) {
    const href = row[0]?.match(/\]\(([^)]+)\)/)?.[1] ?? '';
    if (!href || href.includes('#') || href.includes('/')) continue; // inherited
    if (isEnum && ENUM_NOISE_FUNCTIONS.has(href)) continue;
    if (existsSync(join(typeDir, href))) fnFiles.push(href);
  }
  if (fnFiles.length) {
    out += `${hh} Functions\n\n`;
    for (const f of fnFiles) out += renderFunction(join(typeDir, f), outFile, headingLevel + 2);
  }

  // nested public types (excluding companions and enum entries)
  if (!isEnum) {
    const nested = readdirSync(typeDir).filter((e) => {
      const p = join(typeDir, e);
      return statSync(p).isDirectory() && e !== '-companion' && existsSync(join(p, 'index.md'));
    });
    if (nested.length && headingLevel <= 2) {
      out += `${hh} Nested types\n\n`;
      for (const n of nested) out += renderType(join(typeDir, n), outFile, headingLevel + 2).markdown;
    }
  }

  const inheritors = parseTable(sections['Inheritors'] ?? []);
  if (inheritors.length) {
    out += `${hh} Inheritors\n\n`;
    for (const row of inheritors) out += `- ${cleanInline(row[0] ?? '', typeDir, outFile)}\n`;
    out += '\n';
  }

  return {name, markdown: out};
}

// ---------- write output ----------

rmSync(target, {recursive: true, force: true});
mkdirSync(target, {recursive: true});

let pageCount = 0;
const pkgSummaries: (Pkg & {typeCount: number})[] = [];

for (const pkg of packages) {
  const pkgOut = join(target, pkg.slug);
  mkdirSync(pkgOut, {recursive: true});
  const position = PKG_ORDER.indexOf(pkg.suffix);

  // package index: list of types with summaries from the package's Types table
  const pkgLines = readLines(join(pkg.dir, 'index.md'));
  const {sections} = splitSections(pkgLines);
  const typeRows = parseTable(sections['Types'] ?? []);
  const pkgIndexOut = `${pkg.slug}/index.md`;

  let pkgMd = `---\ntitle: ${pkg.pkgName}\nsidebar_label: ${pkg.suffix}\n`;
  if (position !== -1) pkgMd += `sidebar_position: ${position + 1}\n`;
  pkgMd += `---\n\n# ${pkg.pkgName}\n\n| Type | Description |\n|---|---|\n`;
  for (const row of typeRows) {
    const label = (row[0] ?? '').match(/\[([^\]]+)\]/)?.[1] ?? '';
    if (!label) continue; // header row
    const href = (row[0] ?? '').match(/\]\(([^)]+)\)/)?.[1] ?? '';
    const link = resolveHref(pkg.dir, href, pkgIndexOut) ?? '';
    const {desc} = parseSummaryCell(row[1] ?? '');
    pkgMd += `| ${link ? `[${label}](${link})` : label} | ${escapeForTable(cleanInline(desc, pkg.dir, pkgIndexOut))} |\n`;
  }
  writeFileSync(join(pkgOut, 'index.md'), pkgMd);

  for (const typeDir of pkg.types) {
    const outFile = outDocPath(typeDir);
    const {name, markdown} = renderType(typeDir, outFile, 1);
    // explicit slug: a type named like its package folder would otherwise become the folder index
    const front = `---\ntitle: ${name}\nsidebar_label: ${name}\nslug: /${outFile.replace(/\.md$/, '')}\n---\n\n# ${name}\n\n`;
    writeFileSync(join(target, outFile), front + markdown);
    pageCount++;
  }
  pkgSummaries.push({...pkg, typeCount: pkg.types.length});
}

// root overview
let rootMd = `---\ntitle: CorePOS SDK Reference\nsidebar_label: Overview\nsidebar_position: 0\n---\n\n# CorePOS SDK Reference\n\nAPI reference generated from KDoc comments in the CorePOS SDK sources.\nSelect a package below or browse the sidebar.\n\n| Package | Types |\n|---|---|\n`;
for (const pkg of pkgSummaries.sort((a, b) => {
  const ia = PKG_ORDER.indexOf(a.suffix);
  const ib = PKG_ORDER.indexOf(b.suffix);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
})) {
  rootMd += `| [${pkg.pkgName}](${pkg.slug}/index.md) | ${pkg.typeCount} |\n`;
}
writeFileSync(join(target, 'index.md'), rootMd);

console.log(`Generated ${pageCount} type pages + ${packages.length} package pages in sdk-reference/.`);
