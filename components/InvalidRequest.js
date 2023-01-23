import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner'
import CreatSite from "./homepage/CreateSite";
import HomeAuth from "./homepage/HomeAuth";
import HomePage from "./homepage/HomePage";



const InvalidRequest = ({ setSiteConfig }) => {
    const [page, setPage] = useState("loading")

    useEffect(()=>{
       setTimeout(()=>{
        setPage("home")
            let url = document.URL.split('/')
            let site = url[url.length-1]
            //get site cofig and products from site
            //if succeds set setSiteConfig
            //and navigate back to home page /
            //else if it fails then setValid(false) which will reveal the create site home page
            //load site creation home page

            //note siteHomePage, login and register will be loaded on thi page
            //and displayed dynamically based on the if the exists or not

       }, 3000)
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

