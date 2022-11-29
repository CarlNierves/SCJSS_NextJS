import React, {useContext} from 'react';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { Store } from '../../hooks/useCart';
import { useRouter } from "next/router";

const ShoppingCartSummary = () => {
    const router = useRouter();
    const { state }: any = useContext(Store);
    const {
        cart: {cartItems},
    } = state;
    
    return  (    
        <div className="card">
            <div className="card-body">
                <h5>Total Items: { cartItems.reduce((a: any,c: any) => a + c.quantity, 0)}</h5>
                <h5>Subtotal: $ {cartItems.reduce((a: any,c: any) => a + c.quantity * c.price.value, 0)}</h5>
                <button className="btn btn-warning mt-3" onClick={() => router.push('login?redirect=/checkout')}>Check out</button>
            </div>
        </div>
    );
}               
export default withDatasourceCheck()(ShoppingCartSummary);