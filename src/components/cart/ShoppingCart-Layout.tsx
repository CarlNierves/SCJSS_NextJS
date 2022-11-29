import { Placeholder, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

const ShoppingCartLayout = ({ rendering }: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const disconnectedMode =
    sitecoreContext.route && sitecoreContext.route.layoutId === 'available-in-connected-mode';

  return (
    <div className='container mt-4' data-e2e-id="ShoppingCart-Layout">
      <div className="row">
        <div className="col-8 mt-5">
          {disconnectedMode && (
              <>
              <p>
                  This app is running in disconnected mode. GraphQL requires connected mode, headless
                  connected mode, or integrated mode to work.
              </p>
              <p>
                  Libraries such as <code>graphql-tools</code> can provide GraphQL API mocking
                  capabilities, which could enable disconnected GraphQL. This is not supported out of the
                  box, however.
              </p>
              <p>
                  To view the GraphQL samples, restart the app using <code>jss start:connected</code>
                  &nbsp; or deploy the app to Sitecore to run in integrated mode per the JSS
                  documentation.
              </p>
              </>
          )}
          {!disconnectedMode && <Placeholder name="jss-shopping-cart-list-layout" rendering={rendering} />}
        </div>
        <div className="col-4 mt-5">
          {disconnectedMode && (
              <>
              <p>
                  This app is running in disconnected mode. GraphQL requires connected mode, headless
                  connected mode, or integrated mode to work.
              </p>
              <p>
                  Libraries such as <code>graphql-tools</code> can provide GraphQL API mocking
                  capabilities, which could enable disconnected GraphQL. This is not supported out of the
                  box, however.
              </p>
              <p>
                  To view the GraphQL samples, restart the app using <code>jss start:connected</code>
                  &nbsp; or deploy the app to Sitecore to run in integrated mode per the JSS
                  documentation.
              </p>
              </>
          )}
          {!disconnectedMode && <Placeholder name="jss-shopping-cart-summary-layout" rendering={rendering} />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartLayout;
