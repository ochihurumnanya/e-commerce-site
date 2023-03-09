
import { db, auth } from "../../../utils/db";
//import { verifyuser } from "../../utils/functions/verifyuser";

export default async (req, res) => {

    try{
                /**
                 * const newAdmin = {
                    email: fields.email,
                    token: appuser.token,
                    logo: siteConfig.logo
                }
                 */
                //POST METHOD  TO CREATE SITE
                const { logo, token, uid } = req.body;
                if (req.method == 'POST'){
                    if (
                        logo.trim().length < 50 && 
                        uid.trim().length < 300
                    ) {
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const decodedToken = await auth.verifyIdToken(token)
                        // auid = admin uid
                        const auid = decodedToken.uid
                        // check admins admins
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === auid)
                        //if(adminStatus[0]){
                        if (adminStatus[0].level === 3) {
                            await db.collection("sites").doc(logo).update({
                                admins: JSON.stringify([...JSON.parse(existDocSnap.data().admins).filter((el) => el.uid !== uid)])
                            })
                            //success
                            res.status(200).json({message: "success"})
                        } else {
                            console.log("not authorized")
                            res.status(400).json({message: "Invalid Operation"})
                        }
                                //}
                    } else {
                        console.log("invalid data")
                        res.status(400).json({message: "Invalid Operation"})
                    }
                }
            }catch(error){
                console.log(error)
                res.status(500).json({message: "Invalid Operation"})
            }

}