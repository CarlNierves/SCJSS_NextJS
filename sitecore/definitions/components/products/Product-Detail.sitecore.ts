import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
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
export default function ProductsDetail(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Product-Detail',
    templateName: 'Product-Detail',
    icon: SitecoreIcon.DocumentTag,
    graphQLQuery: query,
    fields: [{ 
      name: 'test', type: CommonFieldTypes.SingleLineText,
    }],
  });
}
