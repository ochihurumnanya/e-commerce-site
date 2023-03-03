import styles from '../../styles/auth.module.css'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import {  logIn } from '../../api/auth/functions'



const  Login = ({ setLocation, setPage})=>{
    const[fields, setFields] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMsg] = useState("");
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false)

   

    const submitLoginDetails = async (event) => {
        event.preventDefault();
        
        //console.log(fields);

        setErrorMsg("");
        setApiError("");
        const {email, password } = fields
        if (!email.trim().length) {
            setErrorMsg("Enter email address")
        } else if (!password.trim().length) {
            setErrorMsg("Enter password")
        } else {
            try{
                setLoading(true)
                //const res = await logIn(email, password)
                await logIn(email, password)
                
                setPage("create")
                setLoading(false)
            }catch(error){
                setApiError("Invalid credentials")
                setLoading(false)
                console.log(error)
            }
           
        }
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
                                    { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                                    <form onSubmit={submitLoginDetails} id="auth-form">
                                        <input onChange={handelChange} type="email" value={fields.email} name="email" className="form-control"  placeholder="Email Address" required />
                                        <p></p>
                                        <input onChange={handelChange} type="password" value={fields.password} name="password" className="form-control"  placeholder="Password" required />
                                        <p></p>
                                        <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                                        <button type="submit"  style={{display: loading ? "none" : "block", background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                                            Login
                                        </button>
                                        <button style={{display: loading ? "block" : "none", background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...
                                        </button>    
                                        <p></p>
                                        <p className={styles.optionLogin}>
                                            <span className="psw">Or <a onClick={()=>{setLocation("register")}} style={{color: '#8b045e'}} id="forgot-pass">Register</a></span>
                                        </p>
                                        <p className={styles.forgot}>
                                            <span className="psw">Forgot <a style={{color: '#8b045e'}} id="forgot-pass">password?</a></span>
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