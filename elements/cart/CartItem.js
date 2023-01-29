import { useEffect, useState } from "react";
import { getCartItems, setCartItems, cleanCart } from '../../components/LocalStorage.js'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';

/**
 * 
 * @img {*product image} param0 
 * @name {*product name} param1
 * @price {*product price} param2
 * @qty {*product quantity} param3
 * @id {*product id} param4
 * @removeItem {*fuction prop that removes sellected item from cart} param5
 * @returns 
 */
/**
 * img={item.img}
              name={item.name}
              price={item.price}
              qty={item.qty}
 */
const cartItem = ({item, setCartItemsState}) => {
    const { btnValue, setBtnValue, formatPrice } = useContext(ProductsData);
    const [qtyValue, setQtyValue] = useState({})

/*
 * addToCart - updates cart each time user's change
 * quantity
 */
const addToCart = (item) => {

    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.id === item.id);
    if (existItem) {
        cartItems = cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
    }
    setCartItems(cartItems);
    setCartItemsState(cartItems);
    
   }

   /*Removes item from cart*/
const removeItem = (id)=>{
    setCartItems(getCartItems().filter((x) => x.id !== id));
    //set global context variable
    let obj = {...btnValue}
    obj[item.id] = false
    setBtnValue(obj)
    setCartItemsState(getCartItems());
  }
  

    const handelChange = (event) =>{
        setQtyValue({...qtyValue, [event.target.name]:Number(event.target.value) < 1 ? 1 : Number(event.target.value)})
        let cartItems = getCartItems();
        const existItem = cartItems.find((x) => x.id === event.target.name);
        //existItem.qty = event.target.value;
        addToCart({ ...existItem, qty: Number(event.target.value) < 1 ? 1 : Number(event.target.value) });
    }

    useEffect(()=>{
        let obj = {...qtyValue}
        obj[item.id] = 1;
        setQtyValue(obj)
    }, [])
    
    /*
        useEffect(()=>{
            let obj = {...qtyValue}
            obj[item.id] = item.qty
            setQtyValue(obj)
        }, [])
    */
    
   return (
    <tr>
        <td><img className="cat-img" src={item.img} /></td>
        <td>{item.name}</td>
        <td>{ formatPrice( item.price )}</td>
        <td><input type="number" onChange={handelChange} className="qty-selects" name={item.id} value={qtyValue[item.id] || ""} style={{textAlign: "center", width: "50px"}} /></td>
        <td><button className="btn-remove-item" onClick={()=>(removeItem(item.id))} style={{border: 'white', background: '#FF5733', color: 'white'}} >Remove</button></td>
    </tr>
   )
}

export default cartItem;