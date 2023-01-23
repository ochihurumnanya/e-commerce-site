import Login from "../elements/auth/login"
import Register from "../elements/auth/register"
import { useEffect, useState } from "react"
import { ProductsData } from '../context/context'
import { useContext } from 'react'



const Auth = () => {
    const { 
        siteConfig,
        setAppuser, 
        appuser,
      } = useContext(ProductsData);

    const [location, setLocation] = useState("login")

    if (location == "login"){
        return (
                <Login 
                    setLocation={setLocation} 
                    siteConfig={siteConfig}
                />
        )
    }else{
        return (
            <Register 
                setLocation={setLocation}
                siteConfig={siteConfig}
                setAppuser={setAppuser}
                appuser={appuser}
            />
        )
    }
   
}
export default Auth