import { createContext, useState, useEffect } from 'react'
import {getCartItems, setCartItems, getSiteConfig, getUserInfo} from "../components/LocalStorage"
import { useRouter } from 'next/router';
import InvalidRequest from '../components/InvalidRequest';
import { createSlides } from '../components/elements/functions';

//import { Currency } from "@depay/local-currency"


//({prodImgmg, name, price, productDsc, btnColor})
//fill this with product from database limit to 20
const products = [
    {
          id:"a1",
          name:"dell 649",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"laptops",
          qty: 3,
          img: "/img/img4.png"
  },
  {
          id:"g2",
          name:"dell 640",
          price:60000,
          dsc:"Intel 64 bits os",
          category:"smart watches",
          qty: 5,
          img: "/img/img5.png"
    },
    {
          id:"u63",
          name:"dell 645",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 2,
          img: "/img/img6.jpg"
    },
    {
          id:"u69",
          name:"asa 640",
          price:60000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 4,
          img: "/img/img6.jpg"
  },
  {
          id:"u690",
          name:"apple 640",
          price:50000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 3,
          img: "/img/img4.png"
  },
  {
          id:"u670",
          name:"nexus 640",
          price:60000,
          dsc:"Intel 64 bits os",
          category:"electronics",
          qty: 1,
          img: "/img/img6.jpg"
  }
  ];


//note add created at field optional
let siteConfigs = {
    logo: "Float",
    logoImg: "/img/img4.png",
    color: "red",
    btnColor: "orange",
    about: "we sale all kinds of laptop, tablets and we also supply hole sale etc",
    shopDsc:"We sale all types of laptop and tablets",
    currency: "en-NG NGN",
    minProduct: 2,
    subscription : true,
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
  const level3 = [...level2, '/dashboard/salse', '/dashboard/credit', '/dashboard/update', '/dashboard/admin']

export const ProductsData = createContext();

const Context = ({ children }) => {
    let router = useRouter();
    const [allProducts, setAllproducts] = useState(products);

    //to check add and remove from cart
    const [btnValue, setBtnValue ] = useState({});

    const [appuser, setAppuser] = useState({})

    const [validated, setValidated] = useState(false)

    const [siteConfig, setSiteConfig] = useState(siteConfigs)

    const [currenciesRate, setCurrenciesRate] = useState({"USD":2.24, "NGN":0.79})

    const [userCurencyCodeAndLocal, setUserCurencyCodeAndLocal] = useState("en-US USD")

    
    const formatPrice = (price) => {
      let currency = userCurencyCodeAndLocal
      let data = currenciesRate
      let storeOwnerCurrency = siteConfig.currency
  
      let locale = currency.split(' ')[0]
      let calRatePrice = price * data[currency.split(' ')[1]]
      let currencyForm = Intl.NumberFormat(locale, {
          style: "currency",
          currency:currency.split(' ')[1]
      })
  
      if (storeOwnerCurrency.split(' ')[0] == currency.split(' ')[0]){
          return currencyForm.format(price)
      }else{
          return currencyForm.format(calRatePrice)
      }
  }
   
    const validate = (level, rout) => {
      if (level.includes(rout)) return true
    }

    
     useEffect(()=>{
       //use getSiteConfig().logo to get products belonging to this site
       //getSiteConfig().logo will be initialized by dynamic rout /logoname
       //this should be initialize from product comming from db by site logo Name on context page
      setAllproducts(products)
    }, [])

    useEffect(()=>{
      let config = getSiteConfig();
      if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(allProducts)})
      //use getSiteConfig().logo to get sites all products (setAllproducts) from sever
      //by making api calls
      if (getUserInfo().adminLevel) setAppuser(getUserInfo())

      //console.log(Currency.getCode());
      //console.log(Currency.getCode());

    }, [])


    const getCurrencyRates = async () => {
      const responds = await fetch(
        `https://v6.exchangerate-api.com/v6/4969a35bd3fed558e0dc02bb/latest/${siteConfig.currency}`
      )
      let data = await responds.json()
      setCurrenciesRate(data.conversion_rates)
    }


    const getCurrencyCodeAndLocal = async () => {
          const responds = await fetch(
            'https://ipapi.co/json/'
          )
          let data = await responds.json()
          //console.log(data)
          let local = data.languages.split(" ")[0] || "en-US"
          let currency = data.currency || "USD"
          setUserCurencyCodeAndLocal(`${local} ${currency}`)
    }
   

    useEffect(()=>{
      if (getSiteConfig().logo) {
        const user = getUserInfo();
        if(user.adminLevel){
            let rout=router.pathname
            if (user.adminLevel == 0)  setValidated(validate(level0, rout))
            if (user.adminLevel == 1)  setValidated(validate(level1, rout))
            if (user.adminLevel == 2)  setValidated(validate(level2, rout))
            if (user.adminLevel == 3)  setValidated(validate(level3, rout))
            //get currency rate based on store owner currency
            //getCurrencyRates()
            //getCurrencyCodeAndLocal()
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
                            currenciesRate,
                            userCurencyCodeAndLocal,
                            setUserCurencyCodeAndLocal,
                            formatPrice
          }}>
       { children }
      </ProductsData.Provider>
   )
  
  
    
}
export default Context;