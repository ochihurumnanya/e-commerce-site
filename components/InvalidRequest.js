import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner'
import CreatSite from "./homepage/CreateSite";
import HomeAuth from "./homepage/HomeAuth";
import HomePage from "./homepage/HomePage";
import {getSiteconfig} from "../api/site/functions" //api call
import { setSiteConfig } from '../components/LocalStorage'



const InvalidRequest = () => {
    const [page, setPage] = useState("loading")

   
    useEffect(()=>{
        const getConfig = async() => {
            try{
                let url = document.URL.split('/')
                const site = url[url.length-1]
                const res = await getSiteconfig({logo:site})
                setSiteConfig(res.data)
                console.log(res.data)
                location = "/"
                //get site cofig and products from site
                //if succeds set setSiteConfig
                //and navigate back to home page /
                //else if it fails then setValid(false) which will reveal the create site home page
                //load site creation home page
            }catch(error){
                setPage("home")
            }
        }
    
        getConfig();
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

