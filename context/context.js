import { createContext, useState, useEffect } from 'react'
import {getCartItems, setCartItems, getSiteConfig, getUserInfo, setUserInfo, cleanCart} from "../components/LocalStorage"
import { useRouter } from 'next/router';
import InvalidRequest from '../components/InvalidRequest';
import { createSlides } from '../components/elements/functions';
import Spinner from 'react-bootstrap/Spinner'


import{ onAuthStateChanged } from 'firebase/auth';
import { auth } from "../utils/config/firebaseConfig"
import { getAdminLevel } from '../api/auth/functions';
import { getProducts } from '../api/product/functions';




//import { Currency } from "@depay/local-currency"


//({prodImgmg, name, price, productDsc, btnColor})
//fill this with product from database limit to 20
const products = [
      
  ];



  const publickLinks = ['/', '/cart', '/auth', '/create', '/about']
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

    const [apierror, setApiError] = useState(false)


    const validate = (level, rout) => {
      if (level.includes(rout)) {
        return true
      }
    }

    useEffect(()=>{
      if (getSiteConfig().logo) {
        const user = getUserInfo();
        if( user.adminLevel >= 0 ){
            let rout=router.pathname
            if (user.adminLevel == 0)  setValidated(validate(level0, rout))
            if (user.adminLevel == 1)  setValidated(validate(level1, rout))
            if (user.adminLevel == 2)  setValidated(validate(level2, rout))
            if (user.adminLevel == 3)  setValidated(validate(level3, rout))
            //setValidated(true)
            if(!validated) {
            
            }
        } else {
            if (publickLinks.includes(router.pathname)) setValidated(true)
        }
      } else {
        setValidated(false)
      }
    }, [])


    const initLogedInSite = async(currentuser, token) => {
      //const email = currentuser.email 
      const logo = getSiteConfig().logo;
      const userToken = token
      //get user admin status
      const adminStatus = await getAdminLevel(token, logo)

      const products = adminStatus.data.level >= 1 ? await getProducts({logo: logo, cat:adminStatus.data.cat}) : await getProducts({logo: logo, cat:"All"})
      console.log(adminStatus.data)
      setAllproducts(products.data)
      setSiteConfig({...getSiteConfig() })
      
      const uerInfor = {
          _id: currentuser.uid,
          u_name: currentuser.displayName,
          u_email: currentuser.email,
          token: userToken,
          adminLevel: adminStatus.data.level || 0, //this will be set by server based on site's preference
          admins: adminStatus.data
        }
      
      setUserInfo({
        _id: currentuser.uid,
        u_name: currentuser.displayName,
        u_email: currentuser.email,
        cart: adminStatus.data.cat || "All",
        adminLevel: adminStatus.data.level || 0 //this will be set by server based on site's preference
      })
      
      setAppuser(uerInfor)
      let config = getSiteConfig();
      if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(products.data)})
      setSiteInit(true)
    }

    const initLogedOutSite = async() => {
      const logo = getSiteConfig().logo;
      //get stores products
      const products = await getProducts({logo: logo, cat:"All"})
      setAllproducts(products.data)

      let config = getSiteConfig();
      if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(products.data)})
          setSiteInit(true)
    }

    //////////////////////////////////////////////////
    /** NOTE IMPLEMENT NETWORK CHECK  */
    /**AUTHENTICATION*/
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, async(currentuser) => {
        if(currentuser) {
            auth.currentUser.getIdToken(/**forceRefresh */ true).then(async(token)=>{
              try{
                initLogedInSite(currentuser, token)
              }catch(error){
                setUserInfo({
                  _id: currentuser.uid,
                  u_name: currentuser.displayName,
                  u_email: currentuser.email,
                  token: token,
                  adminLevel: 0 //this will be set by server based on site's preference
                })
                const products = await getProducts({logo: logo, cat:"All"})
                setAllproducts(products.data)
    
                let config = getSiteConfig();
                if (getSiteConfig().logo) setSiteConfig({...config, cart: createSlides(products.data)})
                  setAppuser(getUserInfo())
                  setSiteInit(true)
                }
            }).catch((error)=>{
                console.log(error)
            })
          //alert(currentuser.email)
        } else {
            initLogedOutSite()
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
      //set qty property to 1 by default
      let newItem = item
      newItem.qty = 1;
      cartItems = [...cartItems, newItem];
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