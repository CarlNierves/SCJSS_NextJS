import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-dev-tools';
/**
 * Adds the Jumbotron component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when 'jss manifest' is run.
 * @param {Manifest} manifest Manifest instance to add components to
 */
export default function LoginForm(manifest: Manifest): void {
  manifest.addComponent({
    name: 'LoginForm',
    templateName: 'LoginForm',
    icon: SitecoreIcon.SetCustom_editors,
    fields: [{ 
      name: 'heading', type: CommonFieldTypes.SingleLineText,
    }],
    /*
    If the component implementation uses <Placeholder> or withPlaceholder to expose a placeholder,
    register it here, or components added to that placeholder will not be returned by Sitecore:
    placeholders: ['exposed-placeholder-name']
    */
  });
}
