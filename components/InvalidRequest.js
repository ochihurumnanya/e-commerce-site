import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner'
import CreatSite from "./homepage/CreateSite"
import HomeAuth from "./homepage/HomeAuth"
import HomePage from "./homepage/HomePage"
import {getSiteconfig} from "../api/site/functions"
import { setSiteConfig, clearStorage } from '../components/LocalStorage'
import { useRouter } from 'next/router'
import { logOut } from "../api/auth/functions"



const InvalidRequest = () => {
    let router = useRouter()
    const [page, setPage] = useState("loading")

    useEffect(()=>{
        const getConfig = async() => {
            try{
                let url = document.URL.split('/')
                const site = url[url.length-1]
                //alert(site)
                const res = await getSiteconfig({logo:site})
                setSiteConfig(res.data)
                router.push('/')
            }catch(error){
                logOut()
                clearStorage('userInfo')
                clearStorage('cartItems')
                clearStorage('salsereceipt')
                clearStorage('siteConfig')
                setPage("home")
            }
        }
    
        getConfig()
    }, [])

    if (page == "loading") {
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
    
    if (page == "home"){
        return (<HomePage setPage={setPage} />)
    }

    if (page == "create"){
        return (<CreatSite />)
    }

    if (page == "auth"){
        return (<HomeAuth setPage={setPage}/>)
    }
    
}
export default InvalidRequest;

