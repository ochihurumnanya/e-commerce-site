
const setItemCheck = (key, value) => {
  if(typeof window !== "undefined"){
    localStorage.setItem(key, value)
  }
}

const getItemCheck = (key) => {
  if(typeof window !== "undefined"){
    return localStorage.getItem(key)
  }
}

const clearItemCheck = (key) => {
  if(typeof window !== "undefined"){
    localStorage.removeItem(key);
  }
}

 /*
  * setUsetInfo - save user info temporary
  * localStorage
  */
 export const setUserInfo = ({
    _id = '',
    u_name = '',
    u_email = '',
    adminLevel = 0,
 }) => { 
    setItemCheck('userInfo', JSON.stringify({
      _id,
      u_name,
      u_email,
      adminLevel,
    }))
  };

  //localStorage.removeItem('userInfo');
  export const getUserInfo = () => {
    return getItemCheck('userInfo')
      ? JSON.parse(getItemCheck('userInfo'))
      : false;
  };
  
  export const clearUser = () => {
    clearItemCheck('userInfo')
  };

  //to clear all storage
  export const clearStorage = (key) => {
    clearItemCheck(key)
  };
  
  
  
  /*
   * getCartItems - function that returns user's cart items
   */
  export const getCartItems = () => {
    const cartItems = getItemCheck('cartItems')
      ? JSON.parse(getItemCheck('cartItems'))
      : [];
    return cartItems;
  };

   /*
   * getSalseReceipt - function that returns salsereceipt items
   */
   export const getSalseReceipt = () => {
    const salseReceipt = getItemCheck('salsereceipt')
      ? JSON.parse( getItemCheck('salsereceipt') )
      : {};
    return salseReceipt;
   };
  
   /*
   * setSalseReceipt - function that sets salsereceipt items
   */
   export const setSalseReceipt = (salse) => {
    setItemCheck('salsereceipt', JSON.stringify(salse))
   };
  
   /*
    * setCartItems - function that set customer's cart items
    */
  export const setCartItems = (cartItems) => {
    setItemCheck('cartItems', JSON.stringify(cartItems))
    };

    /*
    * setUserLocation - function that set user's location
    */
  export const setUserLocation = (location) => {
    setItemCheck('location', location)
    };
  
     /*
    * setUserLocation - function that set user's location
    */
  export const getUserLocation = () => {
    return getItemCheck('location')
    };
   
  
  /*
  * setSiteConfig - set site config
  */
  export const setSiteConfig = (siteConfig) => {
    setItemCheck('siteConfig', JSON.stringify(siteConfig))
  };
  
 /*
   * getCartItems - function that returns  site config
   */
 export const getSiteConfig = () => {
  const siteConfig = getItemCheck('siteConfig')
    ? JSON.parse(getItemCheck('siteConfig'))
    : {};
  return siteConfig;
 };

 export const cleanSiteConfig = () => {
  clearItemCheck('siteConfig')
};
 
   
    
   
  export const cleanCart = (key) => {
    clearItemCheck(key)
  };
  
  export const getShipping = () => {
    const shipping = getItemCheck('shipping')
      ? JSON.parse(getItemCheck('shipping'))
      : {
          email: '',
          phone: '',
          address: '',
          city: '',
          country: '',
        };
    return shipping;
  };
  
  export const setShipping = ({
    email = '',
    phone = '',
    address = '',
    city = '',
    country = '',
  }) => {
    setItemCheck('shipping', JSON.stringify({ email, phone, address, city, country }))
  };