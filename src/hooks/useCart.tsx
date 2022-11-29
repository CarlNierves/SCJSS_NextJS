import { createContext, useReducer } from "react";
//import Cookies from "js-cookie";

export const Store = createContext("");

let initialState = {
    cart: { cartItems: [] },
 };

// if(ses === null) {
// //   initialState = {
// //     cart: JSON.parse(sessionStorage.getItem('cart')!),
// //   }
// }

function reducer(state: any, action: any) {
    switch(action.type){
        case 'ADD_TO_CART': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                (item: any) => item.id == newItem.id
            );
            const cartItems = existItem ? state.cart.cartItems.map((item: any) => item.name == existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            sessionStorage.setItem('cart', JSON.stringify({...state.cart, cartItems}));
            return { ...state, cart: {...state.cart, cartItems} }; 
        }
        case 'REMOVE_FROM_CART': {
            const cartItems = state.cart.cartItems.filter(
                (item: any) => item.id !== action.payload.id
            );
            sessionStorage.setItem('cart', JSON.stringify({...state.cart, cartItems}));
            return { ...state,cart: { ...state.cart, cartItems} };
        }
        case 'RESET_CART' : {
            return { ...state, cart: { cartItems: [], shippingAddress: { location: {}}, paymentMethod: '',} };
        }
        case 'CLEAR_CART_ITEMS' : {
            return { ...state, cart: { ...state.cart, cartItems: []}};
        }
        default :
        return state;
    }
}

export function StoreProvider ( {children}:any ) {
    const [state, dispatch ] = useReducer(reducer, initialState);
    const value: any = {state, dispatch};
    return <Store.Provider value={value}>
        {children}
    </Store.Provider>
}