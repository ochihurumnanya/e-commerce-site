//end point
//pages/api/user  (to create new user)

import { db, auth, storage } from "../../../utils/db";



export default async (req, res) => {
try{
        const { token, logo, id } = req.body;
        //POST METHOD  TO CREATE SITE
        if (
            id.trim().length < 400 &&
            logo.trim().length < 50  
        ){
            if (req.method == 'POST'){
                        const decodedToken = await auth.verifyIdToken(token)
                        const uid = decodedToken.uid
                        await db.collection("stores").doc(logo).collection("oders").doc(id).delete()
                        //success
                        res.status(200).json({message: "deleted"})
                
                    //UPDATE THE
            }
        } else {
            res.status(400).json({message: "invalid operation"})
        }    
    }catch(error){
        console.log(error)
        res.status(400).json({message: "invalid operation"})
    }

}

/**
 * const existDocSnap = await db.collection("sites").doc(logo).get()
                    if (existDocSnap.exists){
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                        
                        if (adminStatus.length){
                            // send entire admins
                            if (adminStatus[0].level >= 2) {
                                    await db.collection("stores").doc(logo).collection("oders").doc(id).delete()
                                    //success
                                    res.status(200).json({message: "updated"})
                                
                            } else {
                                    res.status(400).json({message: "invalid operation"})
                            }
                        } else {
                            res.status(400).json({message: "invalid operation"})
                        }
                    } else {
                            res.status(400).json({message: "invalid operation"})
                    }
 */