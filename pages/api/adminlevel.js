//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { db } from "../../utils/db";

export default async (req, res) => {

    try{
             //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
            const { logo, email } = req.body;
            if (logo.trim().length < 50 && email.trim().length < 50) {
                const existDocSnap = await db.collection("sites").doc(logo).get()
                if(existDocSnap.exists){
                    const adminStatus =JSON.parse(existDocSnap.data().admins).filter((admin) => admin.email === email)
                    if (adminStatus.length){
                        // send entire admins
                        if (adminStatus[0].level == 3) {
                             //success
                             res.status(200).json({ level: adminStatus[0].level, admins: JSON.parse(existDocSnap.data().admins) })
                        } else {
                            //success
                            res.status(200).json({ level: adminStatus[0].level })
                        }
                        
                    } else {
                        res.status(200).json({ level: 0 })
                    }
                    //JSON.parse(existDocSnap.data().siteConfig),
                }else{
                        res.status(400).json({message: "Exist"})
                }
            }else{
                res.status(400).json({message: "invalid operation"})
            }
        } 
    }catch(error){
        res.status(501).json({message: "An error occured"})

    }

}