import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useRouter } from 'next/router';
import { Store } from '../../hooks/useCart';
import React, { useContext } from 'react';

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
  price: {
    jsonValue: {
        value: number;
    }
    value: number;
  }
  quantity: {
    jsonValue: {
        value: string;
    }
    value: number;
  }
};

type ItemSearchResults = {
  results: Item[];
};

type ProductsProps = ComponentProps & {
  fields: {
    data: {
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
  const param = router.query.item;
  const { state, dispatch }: any = useContext(Store);
  const { contextItem } = props.fields.data;
  const data = contextItem.children.results.find((product) => product.name === param);
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x: any) => x.id === data?.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
  
    if(data && data.quantity.value < quantity){
      alert('Sorry you exceeded the amount of stocked items');
     return;
    }
    dispatch({type: 'ADD_TO_CART', payload: {...data, quantity }});
  }

  return (
    <div data-e2e-id="products" className="container mt-5">
        <div className="mb-3">
            <button className='btn btn-link' style={{ textDecoration: "none" }} onClick={() => router.push("/Products")} >Back to products</button>
        </div>
        {data && (<>
            <div className="col">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img className="img-fluid rounded-start" src={data.image.value} alt={data.name} style={{width: "auto", height: "100%"}}  />
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <h5 className="card-title">{data.title.value}</h5>
                                <p className="card-text">{data.description.value}</p>
                                <dl className="row p-0">
                                    <dt className="col-sm-4">Price</dt>
                                    <dd className="col-sm-8"><p className="card-text">{data.price.value}</p></dd>
                                    <dt className="col-sm-4">Quantity</dt>
                                    <dd className="col-sm-8"><p className="card-text">{data.quantity.value}</p></dd>
                                </dl>
                                <button className="btn btn-primary" onClick={addToCartHandler}>Add to Cart</button>                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)}
    </div>
  );
};

export default withDatasourceCheck()<ProductsProps>(Products);
