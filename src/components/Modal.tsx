import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import React, { useContext } from "react";
import { Store } from '../hooks/useCart';

export default function Modal(props: any){
    const { dispatch }: any = useContext(Store);
    const logoutHandle = async () => {
        Cookies.remove('cart');
        dispatch({ type: 'RESET_CART'});
        await signOut({redirect: false, callbackUrl: "/"});
        props.hide('faklse');
    }

    return (
        <div className="modal fade show" style={{display: "block", backgroundColor: "rgba(0,0,0,0.8)"}} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{props.user}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => props.hide('false')}></button>
            </div>
            <div className="modal-body">
                Are you sure want to log out?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => props.hide('false')}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={logoutHandle}>Log Out</button>
            </div>
            </div>
        </div>
        </div>
    )
}