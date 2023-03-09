
import { db, auth } from "../../../utils/db";
//import { verifyuser } from "../../utils/functions/verifyuser";

export default async (req, res) => {

    try{
                //POST METHOD  TO CREATE SITE
                const { logo, token } = req.body;
                if (req.method == 'POST'){
                    if (logo.trim().length < 50 ) {
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const decodedToken = await auth.verifyIdToken(token)
                        const uid = decodedToken.uid
                        // check admins admins
                        if (existDocSnap.exists){
                            const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                            if(adminStatus[0]){
                                if (adminStatus[0].level === 3) {
                                    //success
                                    res.status(200).json({level: adminStatus[0].level, cat:adminStatus[0].cat, admins: JSON.parse(existDocSnap.data().admins) })
                                } else {
                                    //success
                                    res.status(200).json({ level: adminStatus[0].level, cat: adminStatus[0].cat })
                                }
                            } else {
                                res.status(200).json({ level: 0 })
                            }
                            
                        } else {
                            res.status(200).json({ level: 0 })
                        }
                        
                    } else {
                        res.status(500).json({message: "Invalid Operation"})
                    }
                }
            }catch(error){
                console.log(error)
                res.status(500).json({message: "Invalid Operation"})
            }

}