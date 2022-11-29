import { Text, Field, withDatasourceCheck, LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type JumbotronProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    link: LinkField;
  };
};

const Jumbotron = (props: JumbotronProps): JSX.Element => (
  <div className="container p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold"><Text field={props?.fields?.heading} /></h1>
          <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
          <Link field={ props?.fields.link } className='btn btn-primary btn-lg' type='button'></Link>
      </div>
  </div>
);

export default withDatasourceCheck()<JumbotronProps>(Jumbotron);
