import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';

/**
 * Adds the ContentBlock component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.js) when `jss manifest` is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function ShoppingCartList(manifest: Manifest): void {
  manifest.addComponent({
    name: 'ShoppingCart-List',
    templateName: 'ShoppingCart-List',
    icon: SitecoreIcon.GraphConnection_directed,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, },
      { name: 'btnlink', type: CommonFieldTypes.GeneralLink, }
    ],
  });
}
