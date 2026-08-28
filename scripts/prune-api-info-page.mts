// Removes the spec's generated info page. It duplicates api-docs/introduction.md
// (title, version and the bearer scheme) and is published as a second
// "Introduction". Runs after `docusaurus gen-api-docs`.
//
// Drops the page, its sidebar entry, and the info_path front matter that would
// otherwise link every operation page to it.
import {existsSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiDocs = join(siteRoot, 'api-docs');
const INFO_ID = 'corepos-api';

const infoPage = join(apiDocs, `${INFO_ID}.info.mdx`);
if (existsSync(infoPage)) rmSync(infoPage);

let stripped = 0;
for (const file of readdirSync(apiDocs).filter((f) => f.endsWith('.api.mdx'))) {
  const path = join(apiDocs, file);
  const before = readFileSync(path, 'utf8');
  const after = before.replace(/^info_path:.*\r?\n/m, '');
  if (after !== before) {
    writeFileSync(path, after);
    stripped++;
  }
}

const sidebarPath = join(apiDocs, 'sidebar.ts');
if (existsSync(sidebarPath)) {
  const sidebar = readFileSync(sidebarPath, 'utf8');
  const withoutInfo = sidebar.replace(
    new RegExp(`\\s*\\{\\s*type:\\s*"doc",\\s*id:\\s*"${INFO_ID}",\\s*\\},`),
    '',
  );
  if (withoutInfo !== sidebar) writeFileSync(sidebarPath, withoutInfo);
}

console.log(`Removed the generated info page (${stripped} operation pages no longer link to it).`);
