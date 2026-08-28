import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// Sidebar for the OpenAPI-generated REST API reference, grouped by controller tag.
// rest-api/sidebar.ts is written by `npm run gen-api-docs` and already includes
// the API intro page (it default-exports the items array).
import apiSidebar from './rest-api/sidebar';

const sidebars: SidebarsConfig = {
  restApiSidebar: apiSidebar,
};

export default sidebars;
