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
        }
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
