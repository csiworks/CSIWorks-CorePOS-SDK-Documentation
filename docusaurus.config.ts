import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { LAST_VERSION, VERSIONS } from './config/versions';

const config: Config = {
  title: 'CorePOS SDK',
  tagline: 'CorePOS SDK Documentation',
  favicon: 'img/favicon.ico',

  trailingSlash: false,

  future: {
    v4: true,
  },

  url: 'https://csiworks.github.io',
  baseUrl: '/CSIWorks-CorePOS-SDK-Documentation/',

  organizationName: 'csiworks',
  projectName: 'CSIWorks-CorePOS-SDK-Documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          lastVersion: LAST_VERSION,
          includeCurrentVersion: false,
          onlyIncludeVersions: Object.keys(VERSIONS),
          versions: VERSIONS,
        },
        blog: {},
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // docusaurus-theme-openapi-docs' browser code-sample generator needs a `path`
    // polyfill that the theme itself does not provide.
    () => ({
      name: 'webpack-path-fallback',
      configureWebpack: () => ({
        resolve: {
          fallback: {
            path: require.resolve('path-browserify'),
          },
        },
      }),
    }),
    // Unversioned docs instance holding the Dokka-generated SDK API reference.
    // Content is produced by `gradlew :sdk:dokkaGfm` in the SDK repo and copied
    // here by scripts/generate-sdk-reference.mjs (npm run gen-sdk-docs).
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sdk-reference',
        path: 'sdk-reference',
        routeBasePath: 'sdk-reference',
        sidebarPath: './sidebarsSdkReference.ts',
        // Only index.md marks a category index. Without this, a type page named
        // like its package folder (e.g. action/action.md for the Action class)
        // would be picked as the category index instead.
        sidebarItemsGenerator: async ({defaultSidebarItemsGenerator, ...args}) =>
          defaultSidebarItemsGenerator({
            ...args,
            isCategoryIndex: ({fileName}) => fileName === 'index',
          }),
      },
    ],
    // Unversioned docs instance holding the OpenAPI-generated REST API reference.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'rest-api',
        path: 'rest-api',
        routeBasePath: 'rest-api',
        sidebarPath: './sidebarsRestApi.ts',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    // Generates MDX pages into rest-api/ from the live OpenAPI spec.
    // Run: npm run gen-api-docs  (npx docusaurus gen-api-docs all)
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'rest-api',
        config: {
          corepos: {
            // Enriched locally by scripts/prepare-openapi-spec.mjs (tags, summaries,
            // operationIds) from https://api-sandbox.coreposnow.com/v3/api-docs/third-party.
            specPath: 'openapi/corepos-third-party.json',
            outputDir: 'rest-api',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          },
        },
      },
    ],
  ],

  themes: ['docusaurus-theme-openapi-docs'],

  themeConfig: {
    navbar: {
      title: 'CorePOS SDK',
      logo: {
        alt: 'CorePOS Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docsVersionDropdown',
        },
        {
          to: '/sdk-reference',
          label: 'SDK Reference (Dokka)',
          position: 'left',
        },
        {
          to: '/rest-api/corepos-api',
          label: 'REST API (OpenAPI)',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} CSIworks, Inc. CorePOS SDK Documentation`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
