// Downloads the CorePOS third-party OpenAPI spec for docusaurus-plugin-openapi-docs.
// The server owns summaries, operation ids and tags; this only normalizes ids to
// kebab-case page names and fills gaps for undocumented operations.
//
// Output: openapi/corepos-third-party.json. Run via: npm run gen-api-docs
import {mkdirSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

interface Operation {
  summary?: string;
  operationId?: string;
  tags?: string[];
}

interface Tag {
  name: string;
  description?: string;
}

interface Server {
  url: string;
  description?: string;
}

interface OpenApiSpec {
  paths?: Record<string, Record<string, Operation>>;
  tags?: Tag[];
  servers?: Server[];
}

const SPEC_URL =
  process.env.COREPOS_SPEC_URL ?? 'https://api-sandbox.coreposnow.com/v3/api-docs/third-party';

// The application is served behind a proxy and cannot know its public address, so
// springdoc advertises "/" and every request sample would render without a host.
// The hosts come from the environment: production is the base URL, sandbox is
// offered as an override for testing.
const SERVERS: Server[] = [
  {url: process.env.COREPOS_API_PRODUCTION_URL, description: 'Production'},
  {url: process.env.COREPOS_API_SANDBOX_URL, description: 'Sandbox'},
].filter((s): s is Server => Boolean(s.url));

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(siteRoot, 'openapi', 'corepos-third-party.json');

const titleCase = (s: string): string =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// springdoc's default tag for an unannotated controller, e.g. "third-party-item-controller".
const prettyTag = (raw: string): string =>
  raw.endsWith('-controller') ? titleCase(raw.replace(/^third-party-/, '').replace(/-controller$/, '')) : raw;

function fallbackSummary(method: string, path: string): string {
  const segments = path.replace('/third-party-api/v1/', '').split('/');
  const words = segments.map((s) => (s.startsWith('{') ? 'by ' + s.slice(1, -1) : s.replaceAll('-', ' ')));
  return `${method.charAt(0)}${method.slice(1).toLowerCase()} ${words.join(' ')}`;
}

const kebab = (s: string): string =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const res = await fetch(SPEC_URL);
if (!res.ok) {
  console.error(`Failed to download spec: ${res.status} ${res.statusText} (${SPEC_URL})`);
  process.exit(1);
}
const spec = (await res.json()) as OpenApiSpec;

if (SERVERS.length) {
  spec.servers = SERVERS;
} else {
  console.warn('COREPOS_API_PRODUCTION_URL / COREPOS_API_SANDBOX_URL are unset; keeping the published servers.');
}

const usedIds = new Set<string>();
const usedTags = new Set<string>();

for (const [path, ops] of Object.entries(spec.paths ?? {})) {
  for (const [method, op] of Object.entries(ops)) {
    if (!['get', 'put', 'post', 'delete', 'patch', 'head', 'options'].includes(method)) continue;

    if (!op.summary) {
      op.summary = fallbackSummary(method.toUpperCase(), path);
      console.warn(`No summary for "${method.toUpperCase()} ${path}", using "${op.summary}"`);
    }

    // Page file name / URL: the server's operation id, kebab-cased.
    let id = kebab(op.operationId ?? op.summary);
    while (usedIds.has(id)) id = `${id}-${method}`;
    usedIds.add(id);
    op.operationId = id;

    op.tags = (op.tags?.length ? op.tags : ['misc']).map(prettyTag);
    op.tags.forEach((t) => usedTags.add(t));
  }
}

// Root-level tag list controls group order and powers the generated category pages.
const declared = new Map((spec.tags ?? []).map((t) => [t.name, t.description ?? '']));
spec.tags = [...usedTags].sort().map((name) => ({name, description: declared.get(name) ?? ''}));

mkdirSync(dirname(outFile), {recursive: true});
writeFileSync(outFile, JSON.stringify(spec, null, 2));
console.log(`Wrote spec to ${outFile} (${usedIds.size} operations, ${spec.tags.length} tags).`);
