
import { db, auth } from "../../../utils/db";
//import { verifyuser } from "../../utils/functions/verifyuser";

export default async (req, res) => {

    try{
                /**
                 * const newAdmin = {
                    email: fields.email,
                    level: fields.level,
                    cat:   fields.cat,
                    token: appuser.token,
                    logo: siteConfig.logo
                }
                 */
                //POST METHOD  TO CREATE SITE
                const { logo, token, level, cat, email } = req.body;
                if (req.method == 'POST'){
                    if (
                        logo.trim().length < 50 && 
                        email.trim().length < 50 &&
                        cat.trim().length < 100
                    ) {
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const decodedToken = await auth.verifyIdToken(token)
                        const user = await auth.getUserByEmail(email)
                        const uid = decodedToken.uid

                        if (user.uid) {
                                // check admins admins
                                const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                                //check if the new admin is an admin
                                const isAdmin = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === user.uid).length >= 0 ? true : false
                                //if(adminStatus[0]){
                                if (adminStatus[0].level === 3 && !isAdmin) {
                                    /**
                                     * [ //admins will be added by api dynamically
                                                {
                                                    name: userName,
                                                    uid: uid,
                                                    cat: "All",
                                                    level: 3
                                                }  
                                        ]
                                     */
                                    await db.collection("sites").doc(logo).update({
                                        admins: JSON.stringify([...JSON.parse(existDocSnap.data().admins), {
                                            name: user.displayName,
                                            uid: user.uid,
                                            cat: cat,
                                            level: level
                                        }])
                                    })
                                    //success
                                    res.status(200).json({admin: {
                                            name: user.displayName,
                                            uid: user.uid,
                                            cat: cat,
                                            level: level
                                    }})
                                } else {
                                    console.log("invalid access")
                                    res.status(400).json({message: "Invalid Operation"})
                                }
                                //}
                            
                        } else {
                            console.log("invalid email")
                            res.status(400).json({message: "Invalid Operation"})
                        }
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