// Builds docs/api-reference from two sources:
//   - the SDK's own doc comments (Dokka GFM output) for signatures, parameters,
//     returns and types;
//   - sdk-narrative/ for the hand-authored purpose lines, usage examples and
//     integration guides that cannot be derived from doc comments.
//
// Layout mirrors the narrative it replaces: Models first, then one category per
// connector with a page per operation (single-operation connectors stay one page).
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
  dir: string;
  types: string[];
}

interface Section {
  level: number;
  heading: string;
  lines: string[];
}

interface Narrative {
  front: Record<string, string>;
  lead: string[];
  sections: Section[];
}

type Block = {type: 'para' | 'code' | 'item'; text: string};
type Sections = Record<string, string[]>;

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const sdkRepo = process.env.SDK_REPO ?? join(siteRoot, 'CSIWorks-CorePOS-SDK', 'android');
const dokkaOut = join(sdkRepo, 'sdk', 'build', 'dokka', 'gfm');
const narrativeRoot = join(siteRoot, 'sdk-narrative');
const target = join(siteRoot, 'docs', 'api-reference');

const PKG_PREFIX = 'com.coreposnow.sdk';

// Model pages: one per domain, in the order they appear in the sidebar.
const MODEL_GROUPS: {slug: string; title: string; id: string; pkgs: string[]}[] = [
  {slug: 'inventory', title: 'Inventory', id: 'models-inventory', pkgs: ['inventory']},
  {slug: 'merchant', title: 'Merchant', id: 'models-merchant', pkgs: ['merchant']},
  {slug: 'order', title: 'Order', id: 'models-order', pkgs: ['order']},
  {slug: 'tender', title: 'Tender', id: 'models-tender', pkgs: ['tender']},
  {slug: 'action', title: 'Action', id: 'models-action', pkgs: ['action']},
  {slug: 'payment', title: 'Payment', id: 'models-payment', pkgs: ['payment']},
  {slug: 'intents', title: 'Intents', id: 'models-intents', pkgs: ['utils']},
  {slug: 'exception', title: 'Exception', id: 'models-exception', pkgs: ['common', 'common.exception']},
  {slug: 'scanner', title: 'Scanner', id: 'models-scanner', pkgs: ['scanner']},
  {slug: 'pagination', title: 'Pagination', id: 'models-pagination', pkgs: ['pagination']},
  {slug: 'tokens', title: 'Tokens', id: 'models-tokens', pkgs: ['tokens']},
];

// Connector pages, in sidebar order. `domain` drives the doc id prefix.
const CONNECTORS: {type: string; slug: string; domain: string; position: number}[] = [
  {type: 'InventoryConnector', slug: 'inventory-connector', domain: 'inventory', position: 2},
  {type: 'OrderConnector', slug: 'order-connector', domain: 'order', position: 3},
  {type: 'TenderConnector', slug: 'tender-connector', domain: 'tender', position: 4},
  {type: 'ActionConnector', slug: 'action-connector', domain: 'action', position: 5},
  {type: 'PrinterConnector', slug: 'printer-connector', domain: 'printer', position: 6},
  {type: 'MerchantConnector', slug: 'merchant-connector', domain: 'merchant', position: 7},
  {type: 'PaymentConnector', slug: 'payment-connector', domain: 'payment', position: 8},
  {type: 'ServiceConnector', slug: 'service-connector', domain: 'service', position: 9},
  {type: 'TokensConnector', slug: 'tokens-connector', domain: 'tokens', position: 10},
];

// Narrative operation files whose name differs from the SDK function name.
const NARRATIVE_ALIASES: Record<string, string> = {'update-action': 'update-actions'};

// Words that must not be title-cased naively.
const ACRONYMS = new Set(['ebt', 'sdk', 'api', 'id', 'uuid', 'pos']);
const COMPOUNDS: [RegExp, string][] = [
  [/\bFixed Price\b/g, 'Fixed-Price'],
  [/\bPer Unit\b/g, 'Per-Unit'],
  [/\bVariable Price\b/g, 'Variable-Price'],
];

if (!existsSync(dokkaOut)) {
  console.error(`Dokka output not found at ${dokkaOut}. Run "gradlew :sdk:dokkaGfm" in the SDK repo first.`);
  process.exit(1);
}
if (!existsSync(narrativeRoot)) {
  console.error(`Narrative sources not found at ${narrativeRoot}.`);
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

// "getPagingItems" -> "Get Paging Items", with acronyms and compounds fixed up.
function titleFromName(name: string): string {
  const words = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)));
  let title = words.join(' ');
  for (const [re, to] of COMPOUNDS) title = title.replace(re, to);
  return title;
}

// Fixes capitalization of a hand-written title without changing its wording.
function normalizeTitle(title: string): string {
  let out = title
    .split(' ')
    .map((w, i) => {
      if (ACRONYMS.has(w.toLowerCase())) return w.toUpperCase();
      if (i === 0 || /^[A-Z]/.test(w)) return w.charAt(0).toUpperCase() + w.slice(1);
      // lower-case words after the first read as typos in a title ("Delete item")
      return /^[a-z]+$/.test(w) && !['with', 'and', 'the', 'a', 'of', 'to', 'by', 'for'].includes(w)
        ? w.charAt(0).toUpperCase() + w.slice(1)
        : w;
    })
    .join(' ');
  for (const [re, to] of COMPOUNDS) out = out.replace(re, to);
  return out;
}

function readLines(file: string): string[] {
  return readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .filter((l) => !l.startsWith('//['))
    .filter((l) => {
      const t = l.trim();
      return t !== '[androidJvm]\\' && t !== '[androidJvm]' && t !== 'androidJvm';
    });
}

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
    if (/^\|[\s|:-]*$/.test(t)) continue;
    const cells = t.slice(1, -1).split('|').map((c) => c.trim());
    if (cells.every((c) => c === '')) continue;
    rows.push(cells);
  }
  return rows;
}

// ---------- narrative sources ----------

function parseNarrative(file: string): Narrative | null {
  if (!existsSync(file)) return null;
  const raw = readFileSync(file, 'utf8').split(/\r?\n/);
  const front: Record<string, string> = {};
  let i = 0;
  if (raw[0]?.trim() === '---') {
    i = 1;
    for (; i < raw.length && raw[i].trim() !== '---'; i++) {
      const m = raw[i].match(/^([A-Za-z_]+):\s*(.*)$/);
      if (m) front[m[1]] = m[2].trim();
    }
    i++;
  }
  const lead: string[] = [];
  const sections: Section[] = [];
  let cur: Section | null = null;
  let inFence = false;
  for (; i < raw.length; i++) {
    const line = raw[i];
    if (line.trim().startsWith('```')) inFence = !inFence;
    const m = !inFence && line.match(/^(#{2,6})\s+(.*)$/);
    if (m) {
      cur = {level: m[1].length, heading: m[2].trim().replace(/:+$/, '').trim(), lines: []};
      sections.push(cur);
    } else if (cur) {
      cur.lines.push(line);
    } else {
      lead.push(line);
    }
  }
  return {front, lead, sections};
}

const trimBlank = (lines: string[]): string[] => {
  const out = [...lines];
  while (out.length && out[0].trim() === '') out.shift();
  while (out.length && out[out.length - 1].trim() === '') out.pop();
  return out;
};

// Sections the generator produces itself; anything else in a narrative page is kept.
const MECHANICAL = new Set(['signature', 'parameters', 'returns', 'error handling', 'class overview', 'initialization']);
const isMechanical = (heading: string): boolean => MECHANICAL.has(heading.toLowerCase());
const isMethodIndex = (heading: string): boolean => /methods$/i.test(heading.trim());

// A narrative page repeats its title as the first level-2 heading and — for the
// single-page connectors — starts the operation at the second one. Split there.
interface Split {
  lead: string[];
  intro: Section[];
  opLead: string[];
  op: Section[];
}

function splitNarrative(n: Narrative | null): Split {
  if (!n) return {lead: [], intro: [], opLead: [], op: []};
  const h2 = n.sections.map((s, i) => (s.level === 2 ? i : -1)).filter((i) => i >= 0);
  const first = h2[0];
  const second = h2[1];
  if (first === undefined) return {lead: n.lead, intro: n.sections, opLead: [], op: []};
  const intro = n.sections.slice(first + 1, second ?? n.sections.length);
  // the class overview's prose (its code fence is regenerated) belongs to the lead
  const overview = intro.find((x) => x.heading.toLowerCase() === 'class overview');
  return {
    lead: [...n.lead, ...n.sections[first].lines, ...(overview ? stripFences(overview.lines) : [])],
    intro,
    opLead: second === undefined ? [] : n.sections[second].lines,
    op: second === undefined ? [] : n.sections.slice(second + 1),
  };
}

function stripFences(lines: string[]): string[] {
  const out: string[] = [];
  let inFence = false;
  for (const l of lines) {
    if (l.trim().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(l);
  }
  return out;
}

function sectionText(sections: Section[], heading: string): string {
  const s = sections.find((x) => x.heading.toLowerCase() === heading.toLowerCase());
  return s ? trimBlank(s.lines).join('\n') : '';
}

// Renders the narrative sections a generated page carries over verbatim.
function renderSections(sections: Section[]): string {
  let out = '';
  for (const s of sections) {
    if (isMechanical(s.heading) || isMethodIndex(s.heading)) continue;
    // headings that only group deeper sections still carry structure
    const body = trimBlank(s.lines);
    out += `${'#'.repeat(s.level)} ${s.heading}\n\n`;
    if (body.length) out += `${body.join('\n')}\n\n`;
  }
  return out;
}

const purposeOf = (lead: string[]): string => {
  const line = lead.find((l) => /^\*\*Purpose:\*\*/.test(l.trim()));
  return line ? line.replace(/^\s*\*\*Purpose:\*\*\s*/, '').trim() : '';
};

// The narrative's leading prose, minus the "**Purpose:**" line the page renders itself.
const leadProse = (lead: string[]): string =>
  trimBlank(lead.filter((l) => !/^\*\*Purpose:\*\*/.test(l.trim()))).join('\n');

// ---------- Dokka model ----------

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
  const types: string[] = [];
  const registerTypeDir = (dir: string, pageOwnerDir: string | null): void => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (!statSync(p).isDirectory() || entry === '-companion') continue;
      const owner = pageOwnerDir ?? p;
      if (!pageOwnerDir) types.push(p);
      const name = firstHeading(join(p, 'index.md')) ?? entry;
      typeMap.set(resolve(p), {pkg: pkgName, name, dir: p, owner: resolve(owner)});
      registerTypeDir(p, owner);
    }
  };
  registerTypeDir(pkgDir, null);
  packages.push({pkgName, suffix, dir: pkgDir, types});
}

const pkgBySuffix = new Map(packages.map((p) => [p.suffix, p]));
const typeDirByName = new Map<string, string>();
for (const [dir, info] of typeMap) typeDirByName.set(info.name, dir);

// Where a documented type ends up: page path (relative to docs/api-reference) + anchor.
const pageOfType = new Map<string, {file: string; anchor: string}>();
for (const group of MODEL_GROUPS) {
  for (const suffix of group.pkgs) {
    const pkg = pkgBySuffix.get(suffix);
    if (!pkg) continue;
    for (const typeDir of pkg.types) {
      const info = typeMap.get(resolve(typeDir))!;
      pageOfType.set(resolve(typeDir), {file: `models/${group.slug}.md`, anchor: `#${info.name.toLowerCase()}`});
    }
  }
}

// ---------- link handling ----------

let currentOut = '';

function resolveHref(sourceDir: string, href: string): string | null {
  const [pathPart, anchor] = href.split('#');
  if (anchor !== undefined) return null;
  let abs = resolve(sourceDir, pathPart);
  if (abs.endsWith('index.md')) abs = dirname(abs);
  else if (abs.endsWith('.md')) abs = dirname(abs);
  const info = typeMap.get(abs);
  if (!info) return null;
  const page = pageOfType.get(resolve(info.owner));
  if (!page) return null;
  const rel = relPath(dirname(currentOut), page.file);
  if (page.file === currentOut) return page.anchor || null;
  return rel + page.anchor;
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

function cleanInline(text: string, sourceDir: string): string {
  const linked = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (full, label: string, href: string) => {
    if (/^https?:/.test(href)) return full;
    const resolved = resolveHref(sourceDir, href);
    return resolved ? `[${label}](${resolved})` : label;
  });
  return unescapeEntities(linked)
    .split('`')
    .map((seg, i) => (i % 2 ? seg : seg.replaceAll('<', '\\<').replaceAll('{', '\\{')))
    .join('`');
}

// Rewrites the narrative's doc-id links onto the generated layout.
const idToPath = new Map<string, string>();

function rewriteNarrativeLinks(text: string, outFile: string): string {
  return text.replace(/\]\((?!https?:)([^)]+)\)/g, (full, href: string) => {
    const [pathPart, anchor] = href.split('#');
    const id = pathPart.replace(/\/$/, '').split('/').pop() ?? '';
    const mapped = idToPath.get(id);
    if (!mapped) return full;
    const rel = relPath(dirname(outFile), mapped);
    return `](${rel}${anchor ? '#' + anchor : ''})`;
  });
}

// ---------- Dokka rendering ----------

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

function declType(decl: string): string {
  const m = decl.match(/:\s*(.+)$/);
  if (!m) return '';
  return m[1].replace(/\s*=\s*[^=]*$/, '').trim();
}

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

function renderBlocks(blocks: Block[], sourceDir: string): string {
  let out = '';
  for (const b of blocks) {
    if (b.type === 'code') out += b.text + '\n\n';
    else if (b.type === 'item') out += cleanInline(b.text, sourceDir) + '\n';
    else out += cleanInline(b.text, sourceDir) + '\n\n';
  }
  return out;
}

function extractSignatureAndDescription(lines: string[]): {signature: string; description: Block[]} {
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

// ---------- operation pages ----------

interface Operation {
  fn: string;
  file: string;
  signature: string;
  description: Block[];
  params: Map<string, string>;
  paramOrder: {name: string; type: string}[];
  returns: string;
  returnType: string;
  throws: string[][];
}

function readOperation(file: string): Operation {
  const lines = readLines(file);
  const fn = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? basename(file, '.md');
  const {intro, sections} = splitSections(lines);
  const {signature, description} = extractSignatureAndDescription(intro);
  const plainSig = unescapeEntities(signature.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')).trim();

  const paramOrder: {name: string; type: string}[] = [];
  const open = plainSig.indexOf('(');
  const close = open === -1 ? -1 : findMatching(plainSig, open);
  if (open !== -1 && close !== -1) {
    for (const p of splitTopLevel(plainSig.slice(open + 1, close))) {
      const m = p.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.+)$/);
      if (m) paramOrder.push({name: m[1], type: m[2].replace(/\s*=\s*.*$/, '').trim()});
    }
  }
  const returnType = close === -1 ? '' : (plainSig.slice(close + 1).match(/^\s*:\s*(.+)$/)?.[1] ?? '').trim();

  const params = new Map<string, string>();
  for (const row of parseTable(sections['Parameters'] ?? [])) {
    const name = (row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();
    if (name) params.set(name, cleanInline(row[1] ?? '', dirname(file)));
  }

  return {
    fn,
    file,
    signature: plainSig,
    description,
    params,
    paramOrder,
    returns: (sections['Return'] ?? []).map((l) => l.trim()).filter(Boolean).join(' '),
    returnType,
    throws: parseTable(sections['Throws'] ?? []),
  };
}

// Pulls a parameter description out of the narrative's Parameters section.
function narrativeParams(sections: Section[]): Map<string, string> {
  const out = new Map<string, string>();
  const sec = sections.find((s) => s.heading.toLowerCase() === 'parameters');
  if (!sec) return out;
  for (const line of sec.lines) {
    const m = line.match(/`([A-Za-z_][A-Za-z0-9_]*)`\s*(?:\([^)]*\))?\s*[:\-–]\s*(.+)$/);
    if (m) out.set(m[1], m[2].trim());
  }
  return out;
}

function renderOperationBody(
  op: Operation,
  lead: string[],
  sections: Section[],
  outFile: string,
  title: string,
): string {
  const dir = dirname(op.file);
  const kdocDesc = renderBlocks(op.description, dir).trim();
  const purpose = purposeOf(lead);
  let out = `## ${title}\n\n`;
  // the hand-authored purpose is the curated one-liner; doc comments are the fallback
  if (purpose) out += `**Purpose:** ${rewriteNarrativeLinks(purpose, outFile)}\n\n`;
  else if (kdocDesc) out += `${kdocDesc}\n\n`;

  out += `### Signature:\n\n\`\`\`kotlin\n${cleanSignature(op.signature)}\n\`\`\`\n\n`;

  const fromNarrative = narrativeParams(sections);
  out += '#### Parameters:\n\n';
  if (!op.paramOrder.length) out += 'None.\n\n';
  else {
    for (const p of op.paramOrder) {
      const desc = op.params.get(p.name) || fromNarrative.get(p.name) || '';
      out += `- \`${p.name}\` (${p.type}): ${desc}\n`;
    }
    out += '\n';
  }

  out += '#### Returns:\n\n';
  const retDesc = op.returns ? cleanInline(op.returns, dir) : sectionText(sections, 'Returns');
  if (op.returnType && op.returnType !== 'Unit') {
    out += `\`${op.returnType}\`${retDesc ? ': ' + rewriteNarrativeLinks(retDesc, outFile) : ''}\n\n`;
  } else {
    out += `${retDesc || 'No return value.'}\n\n`;
  }

  const errors = sectionText(sections, 'Error handling');
  if (errors) out += `#### Error Handling:\n\n${rewriteNarrativeLinks(errors, outFile)}\n\n`;
  else if (op.throws.length) {
    out += '#### Error Handling:\n\n';
    for (const row of op.throws) {
      const ex = unescapeEntities((row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'));
      out += `- \`${ex}\` — ${cleanInline(row[1] ?? '', dir)}\n`;
    }
    out += '\n';
  }

  out += rewriteNarrativeLinks(renderSections(sections), outFile);
  return out;
}

// ---------- model pages ----------

function renderTypeReference(typeDir: string, level: number): string {
  const indexFile = join(typeDir, 'index.md');
  const lines = readLines(indexFile);
  const name = lines.find((l) => l.startsWith('# '))?.slice(2).trim() ?? basename(typeDir);
  const {intro, sections} = splitSections(lines);
  const {signature, description} = extractSignatureAndDescription(intro);
  const h = '#'.repeat(level);
  let out = `${h} ${name}\n\n`;
  if (signature) out += '```kotlin\n' + cleanSignature(signature) + '\n```\n\n';
  out += renderBlocks(description, typeDir);

  const entries = parseTable(sections['Entries'] ?? []);
  if (entries.length) {
    out += `${'#'.repeat(level + 1)} Values\n\n`;
    for (const row of entries) {
      const entryName = (row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
      const {desc} = parseSummaryCell(row[1] ?? '');
      out += `- \`${entryName}\`${desc ? ': ' + cleanInline(desc, typeDir) : ''}\n`;
    }
    out += '\n';
  }

  const props = parseTable(sections['Properties'] ?? []).filter((row) => {
    const href = row[0]?.match(/\]\(([^)]+)\)/)?.[1] ?? '';
    return href && !href.includes('#') && !/\[entries\]/.test(row[0] ?? '');
  });
  if (props.length) {
    out += `${'#'.repeat(level + 1)} Values\n\n`;
    for (const row of props) {
      const propName = (row[0] ?? '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
      const {decl, desc} = parseSummaryCell(row[1] ?? '');
      const type = declType(unescapeEntities(decl.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')));
      out += `- \`${propName}\`${type ? ` (${type})` : ''}${desc ? ': ' + cleanInline(desc, typeDir) : ''}\n`;
    }
    out += '\n';
  }

  const fnRows = parseTable(sections['Functions'] ?? []);
  const fns: string[] = [];
  for (const row of fnRows) {
    const href = row[0]?.match(/\]\(([^)]+)\)/)?.[1] ?? '';
    if (!href || href.includes('#') || href.includes('/')) continue;
    if (['value-of.md', 'values.md', 'entries.md'].includes(href)) continue;
    if (existsSync(join(typeDir, href))) fns.push(href);
  }
  if (fns.length) {
    out += `${'#'.repeat(level + 1)} Functions\n\n`;
    for (const f of fns) {
      const op = readOperation(join(typeDir, f));
      out += `- \`${cleanSignature(op.signature)}\`${op.returns ? ' — ' + cleanInline(op.returns, dirname(op.file)) : ''}\n`;
    }
    out += '\n';
  }
  return out;
}

// ---------- write output ----------

rmSync(target, {recursive: true, force: true});
mkdirSync(target, {recursive: true});

const write = (rel: string, body: string): void => {
  const p = join(target, rel);
  mkdirSync(dirname(p), {recursive: true});
  writeFileSync(p, body);
};

const frontMatter = (f: Record<string, string | number | boolean>): string =>
  '---\n' + Object.entries(f).map(([k, v]) => `${k}: ${v}`).join('\n') + '\n---\n\n';

// Pass 1: doc ids -> generated paths, so narrative links can be rewritten.
for (const g of MODEL_GROUPS) idToPath.set(g.id, `models/${g.slug}.md`);
const connectorOps = new Map<string, {ops: string[]; narrativeDir: string | null}>();
for (const c of CONNECTORS) {
  const typeDir = typeDirByName.get(c.type);
  if (!typeDir) continue;
  const files = readdirSync(typeDir).filter(
    (f) => f.endsWith('.md') && f !== 'index.md' && f !== `${basename(typeDir)}.md`,
  );
  const single = files.length <= 1;
  const narrativeDir = existsSync(join(narrativeRoot, c.slug)) ? join(narrativeRoot, c.slug) : null;
  connectorOps.set(c.slug, {ops: files, narrativeDir});
  if (single) {
    idToPath.set(`${c.domain}-api`, `${c.slug}.md`);
  } else {
    idToPath.set(`${c.domain}-api-introduction`, `${c.slug}/intro.md`);
    for (const f of files) {
      const op = readOperation(join(typeDir, f));
      idToPath.set(`${c.domain}-api-${kebab(op.fn)}`, `${c.slug}/${kebab(op.fn)}.md`);
      const alias = NARRATIVE_ALIASES[kebab(op.fn)];
      if (alias) idToPath.set(`${c.domain}-api-${alias}`, `${c.slug}/${kebab(op.fn)}.md`);
    }
  }
}

// Root category
write(
  '_category_.json',
  JSON.stringify(
    {
      label: 'Reference',
      position: 4,
      link: {
        type: 'generated-index',
        slug: '/api-reference',
        description:
          'Reference for every connector and model in the CorePOS Android SDK, including operations, parameters and usage examples.',
      },
    },
    null,
    2,
  ) + '\n',
);

// ----- models -----
write(
  'models/_category_.json',
  JSON.stringify(
    {
      label: 'Models',
      position: 1,
      link: {type: 'generated-index', slug: '/models', description: 'This section covers all models (entities) used in the API'},
    },
    null,
    2,
  ) + '\n',
);

let modelPages = 0;
MODEL_GROUPS.forEach((group, idx) => {
  const outFile = `models/${group.slug}.md`;
  currentOut = outFile;
  const narrative = parseNarrative(join(narrativeRoot, 'models', `${group.slug}.md`));

  const modelsHeading = narrative?.sections.find((s) => s.level === 2 && /models$/i.test(s.heading));
  const documented = new Set<string>();
  for (const s of narrative?.sections ?? []) {
    if (s.level === 2 && s !== modelsHeading) documented.add(s.heading.toLowerCase().replace(/\s+enum$/, '').trim());
  }

  let body = frontMatter({
    id: group.id,
    sidebar_position: idx + 1,
    title: group.title,
    description: `${group.title} models used by the CorePOS Android SDK.`,
    hide_title: true,
    ...(idx === 0 ? {pagination_prev: 'null'} : {}),
  });
  body += `## ${group.title} Models\n\n`;

  // Hand-authored model documentation is richer than the doc comments, so it stays
  // the body of the page; generated sections only fill in undocumented types.
  if (narrative) {
    const lead = leadProse([...narrative.lead, ...(modelsHeading?.lines ?? [])]);
    if (lead) body += rewriteNarrativeLinks(lead, outFile) + '\n\n';
    for (const s of narrative.sections) {
      if (s === modelsHeading) continue;
      const text = trimBlank(s.lines);
      if (!text.length && s.level !== 2) continue;
      body += `${'#'.repeat(s.level)} ${s.heading}\n\n`;
      if (text.length) body += rewriteNarrativeLinks(text.join('\n'), outFile) + '\n\n';
    }
  }

  for (const suffix of group.pkgs) {
    const pkg = pkgBySuffix.get(suffix);
    if (!pkg) continue;
    for (const typeDir of pkg.types) {
      const info = typeMap.get(resolve(typeDir))!;
      if (documented.has(info.name.toLowerCase())) continue;
      body += renderTypeReference(typeDir, 2);
    }
  }
  write(outFile, body);
  modelPages++;
});

// ----- connectors -----
let opPages = 0;
for (const c of CONNECTORS) {
  const typeDir = typeDirByName.get(c.type);
  if (!typeDir) continue;
  const {ops, narrativeDir} = connectorOps.get(c.slug)!;
  const singleFile = ops.length <= 1;
  const classNarrative = singleFile
    ? parseNarrative(join(narrativeRoot, `${c.slug}.md`))
    : narrativeDir
      ? parseNarrative(join(narrativeDir, 'intro.md'))
      : null;

  const operations = ops
    .map((f) => readOperation(join(typeDir, f)))
    .map((op) => {
      const kebabName = kebab(op.fn);
      const narrativeFile = narrativeDir
        ? [join(narrativeDir, `${kebabName}.md`), join(narrativeDir, `${NARRATIVE_ALIASES[kebabName] ?? kebabName}.md`)].find(existsSync)
        : undefined;
      const n = narrativeFile ? parseNarrative(narrativeFile) : null;
      return {op, n, kebabName};
    })
    .sort((a, b) => {
      const pa = Number(a.n?.front.sidebar_position ?? 999);
      const pb = Number(b.n?.front.sidebar_position ?? 999);
      return pa - pb || a.kebabName.localeCompare(b.kebabName);
    });

  if (singleFile) {
    const outFile = `${c.slug}.md`;
    currentOut = outFile;
    const entry = operations[0];
    let body = frontMatter({
      id: `${c.domain}-api`,
      sidebar_position: c.position,
      title: c.type,
      description: `${c.type} reference for the CorePOS Android SDK.`,
      hide_title: true,
    });
    const split = splitNarrative(classNarrative);
    body += `## Introduction\n\n`;
    const lead = leadProse(split.lead);
    if (lead) body += rewriteNarrativeLinks(lead, outFile) + '\n\n';
    body += `### Class Overview\n\n\`\`\`kotlin\n${cleanSignature(readClassSignature(typeDir, c.type))}\n\`\`\`\n\n`;
    body += `### Initialization:\n\n\`\`\`kotlin\nval ${c.domain}Connector = ${c.type}(context)\n\`\`\`\n\n`;
    body += rewriteNarrativeLinks(renderSections(split.intro), outFile);
    if (entry) {
      const title = entry.n?.front.title ? normalizeTitle(entry.n.front.title) : titleFromName(entry.op.fn);
      body += renderOperationBody(entry.op, split.opLead, split.op, outFile, title);
      opPages++;
    }
    write(outFile, body);
    continue;
  }

  write(
    `${c.slug}/_category_.json`,
    JSON.stringify(
      {
        label: c.type,
        position: c.position,
        link: {
          type: 'generated-index',
          slug: `/${c.slug}`,
          description: `Reference for every ${c.type} operation.`,
        },
      },
      null,
      2,
    ) + '\n',
  );

  // intro page: hand-authored guide plus a generated method index
  const introOut = `${c.slug}/intro.md`;
  currentOut = introOut;
  let intro = frontMatter({
    id: `${c.domain}-api-introduction`,
    sidebar_position: 1,
    title: 'Introduction',
    description: `Overview of ${c.type} and its operations.`,
    hide_title: true,
    pagination_prev: 'null',
  });
  const introSplit = splitNarrative(classNarrative);
  intro += '## Introduction\n\n';
  const introLead = leadProse(introSplit.lead);
  if (introLead) intro += rewriteNarrativeLinks(introLead, introOut) + '\n\n';
  intro += rewriteNarrativeLinks(renderSections(introSplit.intro), introOut);
  intro += `### ${c.type} Methods:\n\n`;
  for (const {op, n, kebabName} of operations) {
    const title = n?.front.title ? normalizeTitle(n.front.title) : titleFromName(op.fn);
    const summary =
      purposeOf(splitNarrative(n).lead) || renderBlocks(op.description, dirname(op.file)).trim().split('\n')[0] || '';
    intro += `- [\`${title}\`](${kebabName}.md)${summary ? ' - ' + summary.replace(/\s+/g, ' ') : ''}\n`;
  }
  intro += '\n';
  write(introOut, intro);

  operations.forEach(({op, n, kebabName}, i) => {
    const outFile = `${c.slug}/${kebabName}.md`;
    currentOut = outFile;
    const title = n?.front.title ? normalizeTitle(n.front.title) : titleFromName(op.fn);
    const split = splitNarrative(n);
    const body =
      frontMatter({
        id: `${c.domain}-api-${kebabName}`,
        sidebar_position: i + 2,
        title,
        description: (purposeOf(split.lead) || title).replace(/\s+/g, ' ').replace(/[:"']/g, ''),
        hide_title: true,
      }) + renderOperationBody(op, split.lead, split.op.length ? split.op : split.intro, outFile, title);
    write(outFile, body);
    opPages++;
  });
}

// Dokka renders the AIDL service interface as "unknown class" because generated
// interfaces are not on its analysis classpath, so read the real declaration.
function readClassSignature(typeDir: string, typeName: string): string {
  const src = join(sdkRepo, 'sdk', 'src', 'main', 'java', 'com', 'coreposnow', 'sdk', 'connector', `${typeName}.kt`);
  if (existsSync(src)) {
    const m = readFileSync(src, 'utf8').match(new RegExp(`^(?:open |abstract )?class ${typeName}[^\n]*`, 'm'));
    if (m) return m[0].replace(/\s*\{\s*$/, '').trim();
  }
  const {intro} = splitSections(readLines(join(typeDir, 'index.md')));
  return extractSignatureAndDescription(intro).signature;
}

console.log(`Generated ${modelPages} model pages and ${opPages} operation pages in docs/api-reference/.`);
