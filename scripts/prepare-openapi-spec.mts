// Downloads the CorePOS third-party OpenAPI spec and enriches it for
// docusaurus-plugin-openapi-docs: operation summaries, stable operationIds,
// pretty tag names and a root-level tags list.
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

interface OpenApiSpec {
  paths?: Record<string, Record<string, Operation>>;
  tags?: {name: string; description: string}[];
}

const SPEC_URL =
  process.env.COREPOS_SPEC_URL ?? 'https://api-sandbox.coreposnow.com/v3/api-docs/third-party';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(siteRoot, 'openapi', 'corepos-third-party.json');

// Controller tag -> [name, description] shown as sidebar groups / category pages.
const TAGS: Record<string, [string, string]> = {
  'third-party-item-controller': ['Items', 'Manage inventory items.'],
  'third-party-category-controller': ['Categories', 'Manage inventory categories.'],
  'third-party-charge-controller': ['Charges', 'Manage charges (extra fees) applied to items.'],
  'third-party-discount-controller': ['Discounts', 'Manage discounts.'],
  'third-party-order-controller': ['Orders', 'Read orders and manage line-item dev notes.'],
  'third-party-transaction-controller': ['Transactions', 'Read payment transactions.'],
  'third-party-merchant-controller': ['Merchants', 'Read and update merchant information.'],
  'third-party-o-auth-controller': ['OAuth2', 'Authorization and token endpoints.'],
  'third-party-tip-setting-controller': ['Tip Settings', 'Read and update tipping configuration.'],
  'third-party-app-controller': ['Apps', 'App billing information.'],
  'third-party-dual-pricing-setting-controller': ['Dual Pricing', 'Read dual-pricing configuration.'],
};

// "METHOD /path" -> summary. Anything not listed falls back to a generated one.
const SUMMARIES: Record<string, string> = {
  'GET /third-party-api/v1/items': 'List items',
  'POST /third-party-api/v1/items': 'Create item',
  'GET /third-party-api/v1/items/{itemUuid}': 'Get item',
  'PUT /third-party-api/v1/items/{itemUuid}': 'Update item',
  'DELETE /third-party-api/v1/items/{itemUuid}': 'Delete item',
  'POST /third-party-api/v1/items/batch': 'Batch create items',
  'POST /third-party-api/v1/items/{itemUuid}/images': 'Upload item image',
  'DELETE /third-party-api/v1/items/{itemId}/images': 'Delete item image',
  'GET /third-party-api/v1/categories': 'List categories',
  'POST /third-party-api/v1/categories': 'Create category',
  'GET /third-party-api/v1/categories/{categoryId}': 'Get category',
  'PUT /third-party-api/v1/categories/{categoryId}': 'Update category',
  'DELETE /third-party-api/v1/categories/{categoryId}': 'Delete category',
  'POST /third-party-api/v1/categories/batch': 'Batch create categories',
  'GET /third-party-api/v1/charges': 'List charges',
  'POST /third-party-api/v1/charges': 'Create charge',
  'GET /third-party-api/v1/charges/{chargeId}': 'Get charge',
  'PUT /third-party-api/v1/charges/{chargeId}': 'Update charge',
  'DELETE /third-party-api/v1/charges/{chargeId}': 'Delete charge',
  'POST /third-party-api/v1/charges/batch': 'Batch create charges',
  'GET /third-party-api/v1/discounts': 'List discounts',
  'POST /third-party-api/v1/discounts': 'Create discount',
  'GET /third-party-api/v1/discounts/{discountId}': 'Get discount',
  'PUT /third-party-api/v1/discounts/{discountId}': 'Update discount',
  'DELETE /third-party-api/v1/discounts/{discountId}': 'Delete discount',
  'POST /third-party-api/v1/discounts/batch': 'Batch create discounts',
  'GET /third-party-api/v1/orders': 'List orders',
  'GET /third-party-api/v1/orders/{uuid}': 'Get order',
  'POST /third-party-api/v1/orders/{orderId}/line-items/{lineItemId}/dev-notes': 'Add line item dev notes',
  'DELETE /third-party-api/v1/orders/{orderId}/line-items/{lineItemId}/dev-notes': 'Delete line item dev notes',
  'GET /third-party-api/v1/transactions': 'List transactions',
  'GET /third-party-api/v1/transactions/{uuid}': 'Get transaction',
  'GET /third-party-api/v1/merchants/{merchantId}': 'Get merchant',
  'PUT /third-party-api/v1/merchants/{merchantId}': 'Update merchant',
  'GET /third-party-api/v1/merchants/{merchantId}/apps/billing-info': 'Get app billing info',
  'GET /third-party-api/v1/apps/{appId}/merchants/{merchantId}/billing-info': 'Get merchant billing info for app',
  'GET /third-party-api/v1/oauth2/authorize': 'Authorize application',
  'POST /third-party-api/v1/oauth2/tokens': 'Issue access token',
  'POST /third-party-api/v1/oauth2/tokens/refresh': 'Refresh access token',
  'GET /third-party-api/v1/tip-settings': 'Get tip settings',
  'PUT /third-party-api/v1/tip-settings': 'Update tip settings',
  'PATCH /third-party-api/v1/tip-settings/is-enabled': 'Toggle tipping enabled',
  'GET /third-party-api/v1/dual-pricing-settings': 'Get dual pricing settings',
};

const titleCase = (s: string): string =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

function prettyTag(raw: string): string {
  if (TAGS[raw]) return TAGS[raw][0];
  return titleCase(raw.replace(/^third-party-/, '').replace(/-controller$/, ''));
}

function fallbackSummary(method: string, path: string): string {
  const segments = path.replace('/third-party-api/v1/', '').split('/');
  const words = segments.map((s) => (s.startsWith('{') ? 'by ' + s.slice(1, -1) : s.replaceAll('-', ' ')));
  return `${method.charAt(0)}${method.slice(1).toLowerCase()} ${words.join(' ')}`;
}

const kebab = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const res = await fetch(SPEC_URL);
if (!res.ok) {
  console.error(`Failed to download spec: ${res.status} ${res.statusText} (${SPEC_URL})`);
  process.exit(1);
}
const spec = (await res.json()) as OpenApiSpec;

const usedIds = new Set<string>();
const usedTags = new Map<string, string>(); // pretty name -> description

for (const [path, ops] of Object.entries(spec.paths ?? {})) {
  for (const [method, op] of Object.entries(ops)) {
    if (!['get', 'put', 'post', 'delete', 'patch', 'head', 'options'].includes(method)) continue;

    const key = `${method.toUpperCase()} ${path}`;
    const summary = SUMMARIES[key] ?? fallbackSummary(method.toUpperCase(), path);
    if (!SUMMARIES[key]) console.warn(`No summary override for "${key}", using "${summary}"`);
    op.summary ??= summary;

    // Unique readable operationId -> file name / URL of the generated page.
    let id = kebab(summary);
    while (usedIds.has(id)) id = `${id}-${method}`;
    usedIds.add(id);
    op.operationId = id;

    const rawTags = op.tags?.length ? op.tags : ['misc'];
    op.tags = rawTags.map((t) => {
      const name = prettyTag(t);
      if (!usedTags.has(name)) usedTags.set(name, Object.values(TAGS).find(([n]) => n === name)?.[1] ?? '');
      return name;
    });
  }
}

// Root-level tag list controls group order and powers the generated category pages.
const order = Object.values(TAGS).map(([name]) => name);
spec.tags = [...usedTags.entries()]
  .sort(([a], [b]) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib) || a.localeCompare(b);
  })
  .map(([name, description]) => ({name, description}));

mkdirSync(dirname(outFile), {recursive: true});
writeFileSync(outFile, JSON.stringify(spec, null, 2));
console.log(`Wrote enriched spec to ${outFile} (${usedIds.size} operations, ${spec.tags.length} tags).`);
