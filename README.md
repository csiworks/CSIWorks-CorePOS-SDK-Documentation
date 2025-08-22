## Build (local development)
```bash
npm run start
```
This command starts a local development server and opens a browser window.
Most changes are reflected live without having to restart the server.

## Adding new version
- Make some changes in the docs directory and save them.
- Creating new version (Replace **0.1.5** on new version):
```bash
npm run docusaurus docs:version 0.1.5
```
This will copy the **docs/** folder into **versioned_docs/version-0.1.5**.
- Add the new version to **config/versions.ts**:

#### Before
```ts
import type {VersionOptions} from '@docusaurus/plugin-content-docs';

export const LAST_VERSION = '0.1.4';

export const VERSIONS: Record<string, VersionOptions> = {
  '0.1.4': { path: '0.1.4', label: '0.1.4', banner: 'none' },
};
```

#### After
```ts
import type {VersionOptions} from '@docusaurus/plugin-content-docs';

export const LAST_VERSION = '0.1.5';

export const VERSIONS: Record<string, VersionOptions> = {
  '0.1.5': { path: '0.1.5', label: '0.1.5', banner: 'none' },
  '0.1.4': { path: '0.1.4', label: '0.1.4' },
};

```

## Best Practices When Editing Docs
- When adding new categories — always define the slug(category url) manually:
```json
{
  "label": "Api Reference",
  "position": 4,
  "link": {
    "slug": "/api-reference",   //Here
    "type": "generated-index",
    "description": "This API Reference guide provides detailed instructions on how to utilize all available SDK functionality for seamless POS integration into your app, including essential operations and usage examples."
  }
}
```

- When creating new pages — always set a manual id (it will be the page URL):
```md
---
id: printer-api   //Here
sidebar_position: 5
title: PrinterConnector
description: How to utilize all PrinterConnector functionality.
hide_title: true
---
```

## Deployment

- Check that the build works without errors:
```bash
npm run build
```

- Set your GitHub username (only if not using SSH):
```bash
$env:GIT_USER = "<Your GitHub username>"
```

- Push updates to both main and gh-pages branches.
- Deploy the site:

Using HTTPS (default):

```bash
npm run deploy
```

Using SSH:

```bash
USE_SSH=true npm run deploy

```

