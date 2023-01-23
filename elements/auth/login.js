import styles from '../../styles/auth.module.css'
import { useState, useEffect, cleanCart } from 'react'


const  Login = ({ setLocation, siteConfig})=>{
    const[fields, setFields] = useState({
        email: '',
        password: ''
    })

    const submitLoginDetails = (event) => {
        event.preventDefault();
        console.log(fields);
        //send fields via api and await result which will be set to localStorage user
        //which contains admin status of the site etc
        // and save to localStorage
        /**
         * setUserInfo({
            _id: 'userid',
            u_name: fields.name,
            u_email: fields.email,
            adminLevel: 3, //this will be set by server based on site's preference
          })
         */
        
        // location = "/"
    }

    const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
    }

    return (
            <div className="section-1-container section-container">
                <div className="container">
                    <div className="row">
                        <div className="col section-1 section-description">
                            <h1 id="auth-h" style={{textAlign: "center"}}>Login</h1>
                            <div className="divider-1"><span></span></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={styles.form}>
                            <div className="col-10 offset-1 col-lg-8 offset-lg-2 div-wrapper d-flex justify-content-center align-items-center">
                                <div className="div-to-align">
                                    <form onSubmit={submitLoginDetails} id="auth-form">
                                        <input onChange={handelChange} type="email" value={fields.email} name="email" className="form-control"  placeholder="Email Address" required />
                                        <p></p>
                                        <input onChange={handelChange} type="password" value={fields.password} name="password" className="form-control"  placeholder="Password" required />
                                        <p></p>
                                        <button type="submit"  style={{background: siteConfig.color || '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >Login</button>
                                        <p></p>
                                        <p className={styles.optionLogin}>
                                            <span className="psw">Or <a onClick={()=>{setLocation("register")}} style={{color: siteConfig.color || '#8b045e'}} id="forgot-pass">Register</a></span>
                                        </p>
                                        <p className={styles.forgot}>
                                            <span className="psw">Forgot <a style={{color: siteConfig.color || '#8b045e'}} id="forgot-pass">password?</a></span>
                                        </p>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
}
export default Login;