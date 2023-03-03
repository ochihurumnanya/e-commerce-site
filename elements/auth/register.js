import styles from '../../styles/auth.module.css'
import { useState } from 'react'
import { setUserInfo, getUserInfo, getSiteConfig} from '../../components/LocalStorage'
import { ProductsData } from '../../context/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { signUp } from '../../api/auth/functions';

const  Register = ({ setLocation, siteConfig, setAppuser})=>{
    //using global context
    const { logIn } = useContext(ProductsData);
    let router = useRouter();

    const[fields, setFields] = useState({
        email: '',
        name: '',
        password: '',
        cpassword: ''
    })

    const [errorMsg, setErrorMsg] = useState("");
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false)

    const submitRegisterDetails = async(event) => {
        event.preventDefault();
        setErrorMsg("");
        setApiError("");
        const {email, name, password, cpassword} = fields
        if (!email.trim().length) {
            setErrorMsg("Enter email address")
        } else if (!name.trim().length) {
            setErrorMsg("Enter your fullname")
        } else if (!password.trim().length && password.trim().length < 6) {
            setErrorMsg("Password shoul be at least 6 characters")
        } else if (!password === cpassword) {
            setErrorMsg("Password do not match")
        } else {
            try{
                setLoading(true)
                const res = await signUp(email, password, name)
                //console.log(res.data)
                location = "/auth"
                //setLoading(false)
            }catch(error){
                setApiError(error.response.data.message == 'auth/email-already-exists' ? 'Invalid operation login instead' : 'Error: invalid operation')
                setLoading(false)
            }
        }  
    }

    const handelChange = (event) =>{
        setFields({ ...fields, [event.target.name]: event.target.value });
    }

    return (
        <div className="section-1-container section-container">
            <div className="container">
                <div className="row">
                    <div className="col section-1 section-description">
                        <h1 id="auth-h" style={{textAlign: "center"}}>Register</h1>
                        <div className="divider-1"><span></span></div>
                    </div>
                </div>
                <div className="row">
                    <div className={styles.form}>
                        <div className="col-10 offset-1 col-lg-8 offset-lg-2 div-wrapper d-flex justify-content-center align-items-center">
                            <div className="div-to-align">
                                { apiError && <Alert variant="danger"><center>{ apiError }</center></Alert> }
                                <form onSubmit={submitRegisterDetails} id="auth-form">
                                    <input type="email" onChange={handelChange} name="email" className="form-control"  placeholder="Email Address" required />
                                    <p></p>
                                    <input type="text" onChange={handelChange} name="name" className="form-control"  placeholder="Fullname" required />
                                    <p></p>
                                    <input type="password" placeholder="Enter a strong password of at least 6 characters" onChange={handelChange} name="password" className="form-control"  required />
                                    <p></p>
                                    <p></p>
                                    <input type="password" placeholder="Confirm password" onChange={handelChange} name="cpassword" className="form-control"  required />
                                    <p></p>
                                    <center><p style={{color: "red"}}>{ errorMsg }</p></center>
                                    <button type="submit"  style={{display: loading ? "none" : "block", background: siteConfig.color || '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                                        Register
                                    </button>
                                    <button style={{display: loading ? "block" : "none", background: siteConfig.color || '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >
                                       <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...
                                    </button>
                                    <p></p>
                                    <p className={styles.optionRegister}>
                                        <span className="psw">Or <a onClick={()=>{setLocation("login")}} style={{color: siteConfig.color || '#8b045e'}} id="forgot-pass">Login</a></span>
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
export default Register;