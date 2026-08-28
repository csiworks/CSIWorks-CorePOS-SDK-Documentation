import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// REST API documentation. api-docs/sidebar.ts is written by `npm run gen-api-docs`,
// which also removes the spec's generated info page — it duplicated the
// hand-written introduction.
import apiSidebar from './api-docs/sidebar';

const generated = apiSidebar as unknown[];

const sidebars: SidebarsConfig = {
  apiDocsSidebar: [
    {
      type: 'category',
      label: 'API docs',
      collapsed: false,
      items: ['api-introduction', 'api-installation', ...generated],
    },
    {
      type: 'link',
      label: 'Android SDK docs',
      href: '/',
    },
  ],
};

export default sidebars;
