import { createContext, useState, useEffect } from 'react'
import {getCartItems, setCartItems, getSiteConfig, getUserInfo} from "../components/LocalStorage"
import { useRouter } from 'next/router';
import InvalidRequest from '../components/InvalidRequest';

//({prodImgmg, name, price, productDsc, btnColor})
//fill this with product from database limit to 20
const products = [
    {
          id:"a1",
          name:"dell 649",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"laptops",
          qty: 1,
          img: "/img/img4.png"
  },
  {
          id:"g2",
          name:"dell 640",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"smart watches",
          qty: 1,
          img: "/img/img5.png"
    },
    {
          id:"u63",
          name:"dell 645",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 1,
          img: "/img/img6.jpg"
    },
    {
          id:"u69",
          name:"asa 640",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 1,
          img: "/img/img6.jpg"
  },
  {
          id:"u690",
          name:"apple 640",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 1,
          img: "/img/img4.png"
  },
  {
          id:"u670",
          name:"nexus 640",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 1,
          img: "/img/img6.jpg"
  }
  ];


//({color, data, shopDsc})
let siteConfigs = {
    logo: "Float",
    logoImg: "/img/img4.png",
    color: "red",
    btnColor: "orange",
    about: "we sale all kinds of laptop, tablets and we also supply hole sale etc",
    shopDsc:"We sale all types of laptop and tablets",
    contact: {
      address: "Office address/location",
      phone: "+2349060399343",
      email: "Office@gmail.com"
    },
    //Array of object [{img:["url","url"...], category:["cart","cart"]}]
    cart:[
          {
            category: "laptop",
            imgurl: "/img/img4.png"
          },
          {
            category: "Tablets",
            imgurl: "/img/img5.png"
          }
    ]

  }
  
  const publickLinks = ['/', '/cart', '/auth', '/create']
  const level0 = [...publickLinks, '/oder']
  const level1 = [...level0, '/dashboard']
  const level2 = [...level1, '/dashboard/products', '/dashboard/addproduct']
  const level3 = [...level2, '/dashboard/salse', '/dashboard/credit', '/dashboard/update']

export const ProductsData = createContext();

const Context = ({ children }) => {
    let router = useRouter();
    const [allProducts, setAllproducts] = useState(products);

    //to check add and remove from cart
    const [btnValue, setBtnValue ] = useState({});

    const [appuser, setAppuser] = useState({})

    const [validated, setValidated] = useState(false)

    const [siteConfig, setSiteConfig] = useState({})

    //siteConfig
    
   
   const validate = (level, rout) => {
    if (level.includes(rout)) return true
   }

    useEffect(()=>{
      if (getSiteConfig().logo) setSiteConfig(getSiteConfig())
      //use getSiteConfig().logo to get sites all products (setAllproducts) from sever
      //by making api calls
      if (getUserInfo().adminLevel) setAppuser(getUserInfo())
      
    }, [])

    useEffect(()=>{
      if (getSiteConfig().logo) {
        const user = getUserInfo();
        if(user.adminLevel){
          let rout=router.pathname
          if (user.adminLevel == 0)  setValidated(validate(level0, rout))
          if (user.adminLevel == 1)  setValidated(validate(level1, rout))
          if (user.adminLevel == 2)  setValidated(validate(level2, rout))
          if (user.adminLevel == 3)  setValidated(validate(level3, rout))
          
          if(!validated) {
           
          }
        } else {
            if (publickLinks.includes(router.pathname)) setValidated(true)
        }
      } else {
        setValidated(false)
      }
    }, [])

  

 //add and remove cart item
 const addRemoveCartItems = (item, btnColor, color, setBtnValue) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.id === item.id);
  if (existItem) {
      setCartItems(cartItems.filter((x) => x.id !== item.id));
      let obj = {...btnValue}
      obj[item.id] = false
      setBtnValue(obj)
  }else{
      cartItems = [...cartItems, item];
      setCartItems(cartItems);
      let obj = {...btnValue}
      obj[item.id] = true
      setBtnValue(obj)
  }
}

 const existInCart = (obj, list) => {
  let i;
  for(i = 0; i < list.length; i++) {
      if(list[i].id === obj.id) {
          return true; 
      }
  }
}
//<Loading />

    if (!validated) return (
                              <InvalidRequest 
                                setAllproducts= {setAllproducts}
                                setSiteConfig = {setSiteConfig}
                              />
                            )
      
 
    return (
      <ProductsData.Provider value={{ 
                            allProducts, 
                            setAllproducts, 
                            siteConfig,
                            setSiteConfig, 
                            addRemoveCartItems, 
                            existInCart,
                            btnValue,
                            setBtnValue,
                            appuser,
                            setAppuser,
          }}>
       { children }
      </ProductsData.Provider>
   )
  
  
    
}
export default Context;