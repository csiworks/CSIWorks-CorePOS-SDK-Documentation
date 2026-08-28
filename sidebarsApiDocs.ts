import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// REST API documentation. api-docs/sidebar.ts is written by `npm run gen-api-docs`
// and default-exports the generated items, the first of which is the spec's own
// info page — it carries the sidebar label "Introduction" and would sit next to
// the hand-written one, so it is dropped here. The page itself stays published:
// every operation page links back to it as its info page.
import apiSidebar from './api-docs/sidebar';

const generated = (apiSidebar as {type?: string; id?: string}[]).filter(
  (item) => !(item.type === 'doc' && item.id === 'corepos-api'),
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
