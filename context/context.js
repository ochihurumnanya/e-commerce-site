import { createContext, useState, useEffect } from 'react'
import {getCartItems, setCartItems, getSiteConfig, getUserInfo, setUserInfo, cleanCart} from "../components/LocalStorage"
import { useRouter } from 'next/router';
import InvalidRequest from '../components/InvalidRequest';
import { createSlides } from '../components/elements/functions';
import Spinner from 'react-bootstrap/Spinner'


import{ onAuthStateChanged } from 'firebase/auth';
import { auth } from "../utils/config/firebaseConfig"
import { getAdminLevel } from '../api/auth/functions';




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

    const [siteConfig, setSiteConfig] = useState(getSiteConfig())

    const [currenciesRate, setCurrenciesRate] = useState(0)

    const [userCurencyCodeAndLocal, setUserCurencyCodeAndLocal] = useState("")

    const [apiLoaded, setApiLoaded] = useState(false)

    const [siteInit, setSiteInit] = useState(false)


    //////////////////////////////////////////////////
    /** NOTE IMPLEMENT NETWORK CHECK  */
    /**AUTHENTICATION*/
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, async(currentuser) => {
        if(currentuser) {
          //alert(currentuser.email)
          try{
            const email = currentuser.email 
            const logo = getSiteConfig().logo;
              //get user admin status
              const status = await getAdminLevel(email, logo)
              //if admin level is 3 then set all admins else set 0
              setSiteConfig({...getSiteConfig(), admins: status.data.admins ? status.data.admins : 0 })
              setUserInfo({
                _id: currentuser.uid,
                u_name: currentuser.displayName,
                u_email: currentuser.email,
                adminLevel: status.data ? status.data.level: 0 //this will be set by server based on site's preference
              })
              setAppuser(getUserInfo())
              let config = getSiteConfig();
              if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(allProducts)})
              setSiteInit(true)
          }catch(error){
            setUserInfo({
              _id: currentuser.uid,
              u_name: currentuser.displayName,
              u_email: currentuser.email,
              adminLevel: 0 //this will be set by server based on site's preference
            })
            setAppuser(getUserInfo())
          }
        } else {
          let config = getSiteConfig();
            if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(allProducts)})
            setSiteInit(true)
        } 
      })

      return () => {
        unsubscribe();
      }
    }, [])
  

    
    useEffect(()=>{
        //this should be initialize from product comming from db by site logo Name on context page
      setAllproducts(products)
      getCurrencyRates()
      getCurrencyCodeAndLocal()
    }, [])

    
    const formatPrice = (price) => {
      let currency = userCurencyCodeAndLocal
      let rate = currenciesRate
      let storeOwnerCurrency = siteConfig.currency
      
      let locale = currency.split(' ')[0]
      let calRatePrice = price * rate
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


    const getCurrencyRates = async () => {
      const from = getSiteConfig().currency.split(" ")[1];
      const to = userCurencyCodeAndLocal.split(' ')[1]
      let url = `https://api.exchangerate.host/latest?base=${from}`
      let request = new XMLHttpRequest();
      request.open('GET', url)
      request.responseType = 'json'
      request.send()
      request.onload = () => {
        let response = request.response;
       //alert(response.rates["USD"])
        if(to == from){
          setCurrenciesRate(0)
        } else {
          setCurrenciesRate(response.rates[to])
         
        }
      }

      request.onerror = (error) => {
        console.log(error)
      }
      /*
      const from = siteConfig.currency;
      const to = userCurencyCodeAndLocal.split(' ')[1]
      try{
        const responds = await fetch(
          `https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`
          )
        let data = await responds.json()
        setCurrenciesRate(data.rates[to])
        alert(data.rates[to])
      }catch(error){
        alert("error")
      }
      */
    }


    const getCurrencyCodeAndLocal = async () => {
          const responds = await fetch(
            'https://ipapi.co/json/'
          )
          let data = await responds.json()
          let local = data.languages.split(",")[0] || "en-US"
          let currency = data.currency || "USD"
          setUserCurencyCodeAndLocal(`${local} ${currency}`)
          setApiLoaded(true)
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

    if (!validated) return (
                              <InvalidRequest />
                            )
      
 
   if (apiLoaded && siteInit) {
    return (
      <ProductsData.Provider value={{ 
                            allProducts, 
                            setAllproducts, 
                            siteConfig,
                            setSiteConfig, 
                            addRemoveCartItems, 
                            existInCart,
                            btnValue,
                            setBtnValue, //ADD AND REMOVE CART ITEMMS BUTTONS
                            appuser,
                            setAppuser,
                            currenciesRate,
                            userCurencyCodeAndLocal, //users locals and country code "en-US USD"
                            setUserCurencyCodeAndLocal,
                            formatPrice, //curency formater

          }}>
       { children }
      </ProductsData.Provider>
   )
  }else{
    return (
      <div className="container" style={{paddingBottom: "100px", paddingTop: "50px"}}>
          <br/>
          <center>
              <Spinner animation='grow' varient="dark"/>
              <Spinner animation='grow' varient="dark"/>
              <Spinner animation='grow' varient="dark"/>
              <Spinner animation='grow' varient="dark"/>
          </center>
      </div>
  )
  }
  
  
    
}
export default Context;