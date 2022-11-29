import { Text, withDatasourceCheck, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useRouter } from 'next/router';

// type DataSource = {
//   test: {
//     jsonValue: {
//       value: string;
//     };
//     value: string;
//   };
//   name: string;
//   id: string;
// };

type Item = {
  id: string;
  displayName: string;
  name: string;
  url: {
    path: string;
  };
  title: {
    jsonValue : {
      value: string;
    };
    value: string;
  };
  description: {
    jsonValue: {
      value: string;
    };
    value: string;
  };
  image: {
    jsonValue: {
      value: string;
    };
    value: string;
  };
};

type ItemSearchResults = {
  results: Item[];
};

type ProductsProps = ComponentProps & {
  fields: {
    data: {
      //datasource: DataSource;
      contextItem: {
        id: string;
        description: { jsonValue: { value: string; }};
        children: ItemSearchResults;
        displayName:  string;
      };
    };
  };
};

const Products = (props: ProductsProps): JSX.Element => {
  const router = useRouter();
  // Query results in integrated GraphQL replace the normal `fields` data
  // i.e. with { data, }
  const { contextItem } = props.fields.data;

  function getRoute(contentPath: string) {
    const item = contentPath.substring(contentPath.lastIndexOf('/') + 1);
    const sc_route = 'https://www.scnextjs.localhost/product/?item=' + item;
    router.push(sc_route);
  }

  return (
    <div data-e2e-id="products" className="container mt-5">
      {/* {datasource && (
        <div>
          <h4>Datasource Item (via Integrated GraphQL)</h4>
          id: {datasource.id}
          <br />
          name: {datasource.name}
          <br />
          test: {datasource.test.value}
          <br />
          test (editable): <Text field={datasource.test.jsonValue} />
        </div>
      )} */}
      <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {contextItem && (
          <>
            {contextItem.children.results.map((child: Item) => (
              <div className="card" key={child.name} style={{ width: '18rem', margin: 20 }} onClick={() => getRoute(child.url.path)}>
                <Image field={child.image.jsonValue} className="card-img-top" alt="image" style={{height: '280px', width: 'auto'}}/>
                <div className="card-body">
                    <h5 className="card-title">
                      <Text field={child.title.jsonValue}/>
                      </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      <Text field={child.description.jsonValue}/>
                    </h6>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ProductsProps>(Products);
