//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { db } from "../../../utils/db";

export default async (req, res) => {

    try{
             //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
            const { logo } = req.body;
            
            if (logo.trim().length < 50) { 
                const existDocSnap = await db.collection("sites").doc(logo).get()
                if(!existDocSnap.exists){
                    //success
                    res.status(200).json({message: "good"})
                
                }else{
                        res.status(400).json({message: "Invalid"})
                        //console.log({message: "site exist"})
                        //console.log(existDocSnap.data())
                }
            }else{
                res.status(400).json({message: "invalid operation"})
            }
        } 
    }catch(error){
        res.status(501).json({message: "An error occured"})
      
    }

}