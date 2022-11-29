import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React, {useContext} from 'react';
import { Store } from '../../hooks/useCart';

type CheckoutSummaryProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const CheckoutSummary = (props: CheckoutSummaryProps): JSX.Element => { 
  const { state }: any = useContext(Store);
  const {
      cart: {cartItems},
  } = state; 

  return (
    <div className="card">
    <div className="card-body">
        <h5><Text field={props?.fields?.heading} /></h5>
        <h5>Total Items: { cartItems.reduce((a: any,c: any) => a + c.quantity, 0)}</h5>
        <h5>Subtotal: $ {cartItems.reduce((a: any,c: any) => a + c.quantity * c.price.value, 0)}</h5>
    </div>
  </div>
  )};

export default withDatasourceCheck()<CheckoutSummaryProps>(CheckoutSummary);
