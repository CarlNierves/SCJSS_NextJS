import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
/**
 * Adds the Jumbotron component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function CheckoutSummary(manifest: Manifest): void {
  manifest.addComponent({
    name: 'Checkout-Summary',
    templateName: 'Checkout-Summary',
    icon: SitecoreIcon.DocumentTag,
    fields: [{ 
        name: 'heading', type: CommonFieldTypes.SingleLineText,
    }],
  });
}
