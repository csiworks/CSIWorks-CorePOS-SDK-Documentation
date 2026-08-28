import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// REST API documentation. api-docs/sidebar.ts is written by `npm run gen-api-docs`
// and default-exports the generated items; the hand-written introduction and
// installation pages lead, and the spec's own info page follows as the overview.
import apiSidebar from './api-docs/sidebar';

const generated = (apiSidebar as {docId?: string; label?: string}[]).map((item) =>
  item.docId === 'corepos-api' ? {...item, label: 'API overview'} : item,
);

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
