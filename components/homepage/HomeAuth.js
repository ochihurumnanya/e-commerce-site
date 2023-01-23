import Login from "./Login"
import Register from "./Register"
import { useEffect, useState } from "react"




const HomeAuth = ({ setPage }) => {

    const [location, setLocation] = useState("login")

    if (location == "login"){
        return (
            <>
                 <center><h3>login or register to proceed</h3></center>
                <Login 
                    setLocation={setLocation}
                    setPage={setPage}
                />
            </>
               
        )
    }else{
        return (
            <>
                <center><h3>login or register to proceed</h3></center>
                <Register 
                    setLocation={setLocation}
                    setPage={setPage}
                />
            </>
            
        )
    }
   
}
export default HomeAuth;