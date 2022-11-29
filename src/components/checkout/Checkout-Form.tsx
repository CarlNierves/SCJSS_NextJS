import { withSitecoreContext } from "@sitecore-jss/sitecore-jss-react";
// import { useRouter } from 'next/router';
//import React, { useContext } from 'react';
//import { Store } from '../../hooks/useCart';

// const { state, dispatch }: any = useContext(Store);
// const { cart } = state;
// const { cartItems } = cart;
// const router = useRouter();
// const query = `mutation UpdateItem($datasource: String!, $language: String!, $fields: String!) {
//     updateItem(
//       path: $datasource
//       language: $language
//       fields: $fields
//     ) {
//       ... on SampleItem {
//         title {
//           value
//         }
//       }
//     }
//   }`;

// const checkOutHandler = async () => {
//     try {
//         await cartItems.map( async (item: any) => {
//             const qty = item.product.quantity - item.quantity;
//             await fetch('https://www.scnextjs.localhost/sitecore/api/graph/edge?sc_apikey=d6d6f819-7ab3-4ffc-959f-5fad0be5e4f5',{
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     query,
//                     variables: {
//                         datasource: "",
//                         language: "en",
//                         fields: ""
//                     }
//                 })
//             })
//         });
//         alert("Order Placed!");
//         dispatch({ type: 'CLEAR_CART_ITEMS'});
//         sessionStorage.setItem(
//             'cart',
//             JSON.stringify({...cart, cartItems: [],})
//         );
//         router.push('/');
//     } catch(err) {
//         alert(err);
//     }
// }

const CheckoutForm = () => (
    <div className="container p-5">
        <form>
            <h3 className="mb-5">Shipping Details</h3>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input autoFocus type="text" className="form-control" id="fullname" />
            </div>
            <div className="mb-3">
                <label className="form-label" >Shipping Address</label>
                <input type="text" className="form-control" id="shipping-address" />
            </div>
            <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" id="city" />
            </div>
            <div className="mb-3">
                <label className="form-label">Postal Code</label>
                <input type="text" className="form-control" id="postal-code" />
            </div>
            <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" id="country" />
            </div>
            <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" id="card-number" />
            </div>
            <button type="submit" className="btn btn-success" onClick={checkOutHandler}>Place Order</button>
        </form>
    </div>
)

export default withSitecoreContext()(CheckoutForm);