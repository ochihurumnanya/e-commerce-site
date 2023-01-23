import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Link from "next/link";
import styles from '../../styles/Header.module.css';
import {  getUserInfo } from "../../components/LocalStorage"
import { useRouter } from 'next/router';


const HomePage = ({ setPage }) => {
    let router = useRouter();
    //NOTE UNCOMMENT THIS DURING PRODUCTION VERY IMPORTANT
    //THIS WILL CLEAN PREVOIUS SITE CONFIG
    /*
    useEffect(()=>{
        cleanSiteConfig();
    }, [])
    */
    const createSite = () => {
        if (getUserInfo().adminLevel){
            setPage("create")
        }else{
            setTimeout(()=>{
                setPage("auth")
            }, 4000)
            //return <Alert variant='warning'>You have to login or register to proceed</Alert>
            
        }

    }
    return (
        <>
        <header className="header_section">
        <div className="container-fluid">
        <Navbar  expand="lg">
        <Container fluid>
        
            <a className="navbar-brand" href="/">
              <span id="logo" className="home">
                { "platform" }
              </span>
            </a>
       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Link href="#" legacyBehavior>
          <span className={styles.navLink}>
                <a> HOME </a>
             </span>
          </Link>
          <Link href="#about" legacyBehavior>
          <span className={styles.navLink}>
                <a> ABOUT US </a>
             </span>
          </Link>
          <Link href="#contact" legacyBehavior>
          <span className={styles.navLink}>
                <a> CONTACT US </a>
             </span>
          </Link>
             
          

          
            <Form className="d-flex">
                  <input 
                    type="text"
                    placeholder="Search"
                    className="form-control me-2 input-with-hint"
                    name="search"
                    aria-label="Search"
                  />
                  <button  style={{color: "white", marginLeft: "15px", background: "#ee7f35", boder: "#ee7f35"}} type="button" className="btn">Search</button>
              </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
        
        </div>
        </header>
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
            <div className="row">
                <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" >
                <h1>Better Solution For Your Business</h1>
                <h2>Create your fully custormized e-commerce website with just few clicks, manage salse, customers' oder, print reciept, manage admins, set website custom color etc</h2>
                <div className="d-flex justify-content-center justify-content-lg-start">
                    <a onClick={()=>createSite()} className="btn-get-started scrollto">Get Started</a>
                </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 hero-img" >
                <img src="/img/home-logo.jpeg" className="img-fluid animated" alt="" />
                </div>
            </div>
            </div>
        </section>

        <section id="about" class="contact_section layout_padding">
            <div class="container  ">
                <div class="row">
                    <div class="col-md-6 col-lg-5 ">
                        <div class="img-box">
                        <img
                            src="/img/home-logo.jpeg"
                            alt="First slide"
                            width={"300px"}
                            height={"300px"}
                        />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-7">
                        <div class="detail-box">
                            <div class="heading_container">
                                <h2>
                                About Us 
                                </h2>
                            </div>
                            <p>
                              Create your fully custormized e-commerce website with just few clicks, manage salse, admins, set website custom color etc
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default HomePage