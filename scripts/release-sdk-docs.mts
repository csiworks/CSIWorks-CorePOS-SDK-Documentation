// Cuts a versioned documentation release for an Android SDK version:
// regenerates the SDK reference, snapshots the docs via `docusaurus docs:version`,
// updates config/versions.ts. Idempotent — exits 0 if the version already exists.
//
// Usage: tsx scripts/release-sdk-docs.mts <sdk-version>   (e.g. 0.1.7 or 0.1.7-rc2)
//        SDK_REPO overrides the Android SDK project location.
import {execSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const version: string | undefined = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+(-rc\d+)?$/.test(version)) {
  console.error('Usage: tsx scripts/release-sdk-docs.mts <sdk-version>');
  process.exit(1);
}

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd: string): void => {
  execSync(cmd, {cwd: siteRoot, stdio: 'inherit'});
};

const versionsFile = join(siteRoot, 'versions.json');
const published: string[] = JSON.parse(readFileSync(versionsFile, 'utf8'));
if (published.includes(version)) {
  console.log(`Documentation ${version} is already published — nothing to do.`);
  process.exit(0);
}

run('npm run gen-sdk-docs');
run(`npx docusaurus docs:version ${version}`);

// config/versions.ts mirrors versions.json; the newest version is the default
// and carries no "unmaintained" banner.
const versions: string[] = JSON.parse(readFileSync(versionsFile, 'utf8'));
const entries = versions
  .map((v, i) => `  '${v}': { path: '${v}', label: '${v}'${i === 0 ? ", banner: 'none'" : ''} }`)
  .join(',\n');
writeFileSync(
  join(siteRoot, 'config', 'versions.ts'),
  `import type {VersionOptions} from '@docusaurus/plugin-content-docs';

export const LAST_VERSION = '${versions[0]}';

export const VERSIONS: Record<string, VersionOptions> = {
${entries}
};
`
);
console.log(`Cut documentation version ${version}.`);
