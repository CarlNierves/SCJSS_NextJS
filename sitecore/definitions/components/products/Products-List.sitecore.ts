import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
import fs from 'fs';

const query = fs.readFileSync(
  'sitecore/definitions/components/products/getProducts.sitecore.graphql',
  'utf8'
);

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ProductsList(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Products-List',
    templateName: 'Products-List',
    icon: SitecoreIcon.GraphConnection_directed,
    graphQLQuery: query,
  });
}
