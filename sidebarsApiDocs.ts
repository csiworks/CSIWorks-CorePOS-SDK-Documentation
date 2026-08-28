import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// REST API documentation, grouped by controller tag. api-docs/sidebar.ts is
// written by `npm run gen-api-docs` and default-exports the items array.
import apiSidebar from './api-docs/sidebar';

const sidebars: SidebarsConfig = {
  apiDocsSidebar: [
    {
      type: 'category',
      label: 'API docs',
      collapsed: false,
      items: apiSidebar,
    },
    {
      type: 'link',
      label: 'Android SDK docs',
      href: '/',
    },
  ],
};

export default sidebars;
