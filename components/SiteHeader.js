
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';
import { cleanCart, getUserInfo, setUserLocation, getUserLocation } from '../components/LocalStorage';
import { useState, useEffect } from 'react'
import { ProductsData } from '../context/context';
import { useContext } from 'react';




const SiteHeader = ({ setDashboard, color }) => {
    let router = useRouter();

    const { 
      setAppuser, 
      appuser,
    } = useContext(ProductsData);
    

    useEffect(()=>{
      //NOTE SET setDashboard('false') on the first landing page ie /sitename
      let location = getUserLocation() || 'false';
      setDashboard(location)
    },[]);

    const checkLocation = (location) => {
      setDashboard(location) 
      setUserLocation(location)
    }

   

    const logout = () => {
      cleanCart('userInfo')
      setAppuser({})
    }

    return (
        <div>
                <Nav className="me-auto">
                  <Link href="/" legacyBehavior>
                    <span className={styles.navLink}>
                      <a className={router.pathname == '/' ? styles.active : styles.offactive}> HOME </a>
                    </span>
                  </Link>
                  <Link href="/about" legacyBehavior>
                    <span className={styles.navLink}>
                      <a className={router.pathname == '/about' ? styles.active : styles.offactive}> ABOUT US </a>
                    </span>
                  </Link>
                  <Link href="/cart" legacyBehavior>
                    <span className={styles.navLink}>
                      <a className={router.pathname == '/cart' ? styles.active : styles.offactive}> CART </a>
                    </span>
                  </Link>
                  <Link href="/auth" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 0 ? "none" : "block"}} className={styles.navLink}>
                      <a className={router.pathname == '/auth' ? styles.active : styles.offactive}> LOGIN </a>
                    </span>
                  </Link>
                  <Link href="/oder" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 0 ? "block" : "none"}} className={styles.navLink}>
                        <a className={router.pathname == '/oder' ? styles.active : styles.offactive}> ODER </a>
                    </span>
                  </Link>
                  <Link  href="/dashboard" legacyBehavior>
                    <span style={{display: appuser.adminLevel > 0 ? "block" : "none"}}  onClick={()=>{checkLocation('true')}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard' ? styles.active : styles.offactive}> DASHBOARD </a>
                    </span>
                  </Link>
                  <Link  href="/" legacyBehavior>
                    <span>
                      <a className={styles.navLink} onClick={()=>{logout()}}  style={{display: appuser.adminLevel  >= 0 ? "block" : "none"}}> LOGOUT </a>
                    </span>
                  </Link>
                 

              </Nav>
            </div>
    )
}
export default SiteHeader;