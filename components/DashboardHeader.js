import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import styles from '../styles/Header.module.css';
import { cleanCart, getUserInfo, setUserLocation, getUserLocation } from '../components/LocalStorage';
import { useRouter } from 'next/router';
import { ProductsData } from '../context/context';
import { useContext } from 'react';



const DashboardHeader = ({ setDashboard, color  }) => {
     let router = useRouter();

     const { 
      setAppuser, 
      appuser,
    } = useContext(ProductsData);

     const checkLocation = (location) => {
      setDashboard(location) 
      setUserLocation(location)
    }

    
//getUserInfo().adminLevel
 
    return (
        <Nav className="me-auto">
                  <Link href="/dashboard" legacyBehavior>
                    <span style={{display: appuser.adminLevel > 0  ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard' ? styles.active : styles.offactive}> HOME </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/products" legacyBehavior>
                    <span style={{display: appuser.adminLevel > 1 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/products' ? styles.active : styles.offactive}> PRODUCTS </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/addproduct" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 2 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/addproduct' ? styles.active : styles.offactive}> ADD PRODUCTS </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/salse" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 3 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/salse' ? styles.active : styles.offactive}> SALES </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/credit" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 3 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/credit' ? styles.active : styles.offactive}> CREDIT </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/admin" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 3 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/admin' ? styles.active : styles.offactive}> ADMIN </a>
                    </span>
                  </Link>
                  <Link href="/dashboard/update" legacyBehavior>
                    <span style={{display: appuser.adminLevel >= 3 ? "block" : "none"}} className={styles.navLink}>
                      <a className={router.pathname == '/dashboard/update' ? styles.active : styles.offactive}> UPDATE SITE </a>
                    </span>
                  </Link>
                  <Link href="/" legacyBehavior>
                    <span onClick={()=>{checkLocation('false')}} className={styles.navLink}>
                      <a> STORE </a>
                    </span>
                  </Link>
        </Nav>
    )
}
export default DashboardHeader;