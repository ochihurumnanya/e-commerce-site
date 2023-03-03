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

  const { btnValue, setBtnValue, formatPrice } = useContext(ProductsData);
  let siteConfig=getSiteConfig();
  const [cartItemsState, setCartItemsState] = useState([])
  const [salseModalShow, setSalseModalShow] = useState(false)


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
     if ([1,2,3].includes(getUserInfo().adminLevel)){
        setSalseModalShow(true)
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
                      <tr>
                        <td>
                          <p>
                            <b>Total:</b> <span>{ formatPrice( cartItemsState.reduce((a, c) => a + c.price * c.qty, 0) ) }</span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button className="btn" id="btn-proceed" onClick={()=> proceedToCheckout()} style={{alignSelf:"right", border: "none", margin: '10px', background: siteConfig.color, color: 'white'}}>
                            Proceed
                          </button>
                        </td>
                      </tr>
                </tbody>
              </table>
            </center>
        </div>
        <SalseForm 
             show={salseModalShow} 
             onHide={() => setSalseModalShow(false)}
             cart={getCartItems()}
        />
      </div>
    </>
      )
}

export default cart;