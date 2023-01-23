import styles from '../../styles/auth.module.css'
import { useState } from 'react'
import { setUserInfo, getUserInfo,} from '../../components/LocalStorage'
import { useRouter } from 'next/router';

const  Register = ({ setLocation, setPage })=>{
    let router = useRouter();
//styles/auth.module.css
    const[fields, setFields] = useState({
        email: '',
        name: '',
        password: ''
    })

    const submitRegisterDetails = (event) => {
        event.preventDefault();

        /**Remove thia after test running */
        //do the registration and save user infor retuened from server to local storage
        //using the bellow format
        setUserInfo({
            _id: 'userid',
            u_name: fields.name,
            u_email: fields.email,
            adminLevel: 3, //this will be set by server based on site's preference
          })
          setPage("create")
         // location = "/"
         //router.push("/")
        //send fields via api and await result which will be set to localStorage user
        
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
                                <form onSubmit={submitRegisterDetails} id="auth-form">
                                    <input type="email" onChange={handelChange} name="email" className="form-control"  placeholder="Email Address" required />
                                    <p></p>
                                    <input type="text" onChange={handelChange} name="name" className="form-control"  placeholder="Fullname" required />
                                    <p></p>
                                    <input type="password" onChange={handelChange} name="password" className="form-control"  placeholder="Password" required />
                                    <p></p>
                                    <button type="submit"  style={{background: '#8b045e', color: "white", width: "100%"}} className="btn btn-block" id="btnAcc" >Register</button>
                                    <p></p>
                                    <p className={styles.optionRegister}>
                                        <span className="psw">Or <a onClick={()=>{setLocation("login")}} style={{color: '#8b045e'}} id="forgot-pass">Login</a></span>
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