import Link from 'next/link';
import { useI18n } from 'next-localization';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useContext, useState } from 'react';
import { Store } from './hooks/useCart';
import { useSession} from 'next-auth/react';
import Modal from 'components/Modal';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

const Navigation = (): JSX.Element => {
  const { t } = useI18n();
  const [show, setShow]=React.useState(false);
  const { state }: any = useContext(Store);
  const { cart } = state;
  const { status, data: session } = useSession();
  const [modal, setModal] = useState(false);
 
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container-fluid">
        <h5 className="my-0 mr-md-auto font-weight-normal"><Link href="/"><a className="text-dark navbar-brand"><img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" /></a></Link></h5>
        <button className="navbar-toggler" type="button" onClick={()=>setShow(!show)} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse"  style={show?{display:"block"}:{display:'none'}} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">
              <a className="p-2 text-dark" href="https://jss.sitecore.com" target="_blank" rel="noopener noreferrer">{t('Documentation')}</a>
            </li>
            <li className="nav-item">
              <Link href="/products"><a className="text-dark">{t('Products')}Products</a></Link>
            </li>
          </ul>
          <div className='d-flex'>
            <Link href="/styleguide">
              <a className="p-2 text-dark">{t('Styleguide')}</a>
            </Link>
            <Link href="/graphql">
              <a className="p-2 text-dark">{t('GraphQL')}</a>
            </Link>
            { status === 'loading' ? ( 
                'Loading'
            ) : session?.user ? ( 
                <button className="btn btn-outline-dark mx-1 px-3" onClick={() => { return setModal(true)}}><i className="bi bi-person" style={{fontSize: "1rem"}} />{session?.user.name}</button>
            ) : (<Link href="/login">
              <button className="p-2 btn btn-outline-dark mx-1 px-3"><i className="bi bi-person" style={{fontSize: "1rem"}} />{t('Login')}</button>
            </Link>)}
            <Link href="/cart">
              <button className="p-2 btn btn-outline-dark mx-1 px-3"><i className="bi bi-cart" style={{fontSize: "1rem"}} />{t('Cart')}{cart.cartItems.length > 0 && (<span className="ml-1 rounded-full bg-blue-600 px-2 text-xs font-bold">{cart.cartItems.reduce((a: any,c: any) => a + c.quantity, 0)}</span>)}</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    {
            modal === true ? <Modal user={session?.user?.name} hide={ (modal: boolean | ((prevState: boolean) => boolean)) => setModal(modal)} />: ""
    }
    </>
  );
};

export default Navigation;
