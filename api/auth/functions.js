import axios from "axios"
import { 
    signInWithEmailAndPassword,
    signOut 
  } from 'firebase/auth';

  const URL = "http://localhost:3000/"

  import { auth } from "../../utils/config/firebaseConfig"

  export const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  export const signUp = (email, password, name) => {
    return  axios.post(`${URL}api/user/user`, {email:email, name:name, password:password})
  }

  export const logOut = () => {
    return signOut(auth)
  }

  export const getUserToken = () => {
   return auth.currentUser.getIdToken(/**forceRefresh */ true)
   /*
   */
  }

  export const getAdminLevel = (token, logo) => {
    return  axios.post(`${URL}api/admin/adminlevel`, {token:token, logo:logo})
  }






