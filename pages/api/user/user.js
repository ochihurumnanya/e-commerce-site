//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { auth } from "../../../utils/db";

export default function handler(req, res){
    const { name, email, password } = req.body;

    if (name.trim().length < 100 && email.trim().length < 100 && password.trim().length >= 6){
        auth.createUser({
            email: email,
            displayName: name,
            password: password,
        }).then((user)=>{
            res.status(200).json(user)
        }).catch((error)=>{
            res.status(400).json({message: error.errorInfo.code})
            //console.log("error creating user", error.errorInfo.message);
        })
    }else{
        res.status(400).json({message: "invalid operation"})
        console.log("invalid operation")
    }
}