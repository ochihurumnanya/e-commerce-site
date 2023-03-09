import {getCartItems, setCartItems} from "../../components/LocalStorage"
import { useState, useEffect } from 'react'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';



/**
 * 
 * @name {*product name} param0
 * @img {*product image} param1
 * @dsc {*product description} param2
 * @price {*product price} param3
 * @btnColor {*product price} param4
 * @product {*complete product object containing {name, img, dsc, price} to be saved to local storage } params
 * @returns product box
 * Note [name, img, dsc, price] In product 
 */
const Product = ({btnColor, color, product}) => {
    //Global context object
    const {
        addRemoveCartItems, 
        existInCart, 
        btnValue, 
        setBtnValue, 
        formatPrice
    } = useContext(ProductsData);

        const parsedProduct = JSON.parse(product)
        
        
        useEffect(()=>{
            let cartItem = getCartItems();
            let check = existInCart(parsedProduct, cartItem) 
            let obj = {...btnValue}
            obj[parsedProduct.id] = check ? check : false
            setBtnValue(obj)
        },[])

        return (
                <div id="products" className="col-md-6 ">
                    <div className="box">
                    <div  className="img-box">
                        <img  src={ parsedProduct.img } alt="" />
                    </div>
                    <div className="detail-box">
                        <h6>
                            { parsedProduct.name }
                        </h6>
                    </div>
                    <div>
                        <b>Description:</b> { parsedProduct.dsc }
                        <p>
                            <b>Price:</b> { parsedProduct.price > 0 ? formatPrice(parsedProduct.price) : "NO FIXED PRICE" }
                        </p>
                    </div>
                    <div style={{ background:  btnValue[parsedProduct.id] ? color : btnColor }} className="add-to-cart btn-cat"  onClick={()=>{addRemoveCartItems(parsedProduct, btnColor, color, setBtnValue)}} > { btnValue[parsedProduct.id] ? "Remove From Cart" : "Add To Cart"}</div>
                    <div style={{ background: btnColor }} className="new">
                        <span>
                            New
                        </span>
                    </div>
                </div> 
            </div>
        )
}
export default Product
