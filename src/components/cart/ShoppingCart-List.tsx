import React, {useContext} from 'react';
import { Store } from '../../hooks/useCart';
import { Field, withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import dynamic from 'next/dynamic';

type ShoppingCartListProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    //link: LinkField;
  };
};

const ShoppingCartList = (props: ShoppingCartListProps): JSX.Element => {

    const { state, dispatch }: any = useContext(Store);
    const { cart: { cartItems }, } = state;

    const removeFromCart = (item: any) => {
        dispatch({type: "REMOVE_FROM_CART", payload: item });
    }

    const updateCart = (item: any, qty: string) => {
        const quantity = Number(qty);
        dispatch({type: 'ADD_TO_CART', payload:{...item, quantity}})
    }

    return  (    
    <>
        <h2><Text field={props?.fields?.heading} />&nbsp;<i className="bi bi-cart"></i></h2>
            { cartItems.length == 0 ? 
                ( <div>
                    Cart is empty. 
                </div>): (
                    <table className="table table-borderless mt-3">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item: any) => (
                            <tr key={item.id}> 
                                <th scope="row">
                                    <img src={item.image.jsonValue.value.src} alt={item.displayName} width={50} height={50} />
                                    &nbsp;
                                    {item.displayName}
                                </th>
                                <td>
                                    <select className="form-select" style={{width: "35%"}} value={item.quantity} onChange={(e) => updateCart(item, e.target.value)}>
                                        {item.quantity}
                                        {[...Array(item.quantity).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                { x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </td> 
                                <td>
                                    {item.price.value}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeFromCart(item)}>
                                    <i className="bi bi-bag-x-fill"></i>
                                    </button>
                                </td>                                      
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )
            }
    </>
    );
}               
export default dynamic(() => Promise.resolve(withDatasourceCheck()<ShoppingCartListProps>(ShoppingCartList)), { ssr: false });