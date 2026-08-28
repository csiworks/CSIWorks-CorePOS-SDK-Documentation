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
        blog: false,
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
    // The REST API documentation, generated from the server's published spec.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api-docs',
        path: 'api-docs',
        routeBasePath: 'api-docs',
        sidebarPath: './sidebarsApiDocs.ts',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    // Generates the API documentation pages from the published spec.
    // Run: npm run gen-api-docs
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'api-docs',
        config: {
          corepos: {
            // Downloaded and normalized by scripts/prepare-openapi-spec.mts.
            specPath: 'openapi/corepos-third-party.json',
            outputDir: 'api-docs',
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
