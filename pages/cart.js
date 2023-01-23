import { getCartItems, setCartItems, getSiteConfig, cleanCart, getUserInfo } from '../components/LocalStorage'
import { useEffect, useState } from "react";
import CartItem from '../elements/cart/CartItem'
import Link from 'next/link';
import { ProductsData } from '../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import SalseForm from '../elements/cart/SalseForm';



const cart = () => {
  let router = useRouter();

  const { btnValue, setBtnValue } = useContext(ProductsData);
  let siteConfig=getSiteConfig();
  const [cartItemsState, setCartItemsState] = useState([])
  const [modalShow, setModalShow] = useState(false)


  useEffect(()=>{
    siteConfig = getSiteConfig()
  }, [])
      /*Removes item from cart*/
  function removeItem(id){
    setCartItems(getCartItems().filter((x) => x.id !== id));
    setCartItemsState(getCartItems());
    //showCart();
  }

  //this code will be rerun each time btnValue changes
  useEffect(()=>{
    let items = getCartItems().length === 0 ? [] : getCartItems()
    setCartItemsState(items)
  }, [btnValue])
 
  /*
  setUserInfo({
    _id: 'userid',
    u_name: fields.name,
    u_email: fields.email,
    adminLevel: 0,
  })
  */
  const proceedToCheckout = () => {
     if ([1,2].includes(getUserInfo().adminLevel)){
        setModalShow(true)
     }else{
        router.push('/checkout')
     }
      
     
    
    
  }
  
  let displayCarts = cartItemsState ? 
         (
          cartItemsState.map(
            (item) => <CartItem
                      key={item.id}
                      item={item}
                      removeItem={removeItem}
                      setCartItemsState={setCartItemsState}
                      />
        
          )
         )
        :
        (
          "<tr style='height:300px;'></tr>"
        )

        //style={{display: cartItemsState.length === 0 ? "none" : "block"}}
      return (
      <>
      <h2 className="text-center" style={{display: cartItemsState.length === 0 ? "block" : "none"}}>Cart is empty <Link href="/">go shoping</Link></h2>
      <div className="container">
      <div>
            <center>
              <table style={{width: "100%", height:"100%"}} id="cart-list">
                <tbody>
              <tr>
              <th>image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th></th>
              </tr>
                {
                  displayCarts
                }
                </tbody>
              </table>
            </center>
            <div style={{margin: '10px', width: "100%"}}>
              <p>
                <b>Total:</b> <span>#{cartItemsState.reduce((a, c) => a + c.price * c.qty, 0)}</span>
              </p>
                <button id="btn-proceed" onClick={()=> proceedToCheckout()} style={{border: "none", margin: '10px', background: siteConfig.color, color: 'white'}}>
                    Proceed
                </button>
              
            </div>
        </div>
        <SalseForm 
             show={modalShow} 
             onHide={() => setModalShow(false)}
             cart={getCartItems()}
        />
      </div>
    </>
      )
}

export default cart;