//end point
//pages/api/user  (to create new user)

import { db, auth, storage } from "../../../utils/db";



export default async (req, res) => {

try{

        const { token, logo, id, filename, name, price, qty, cat, dsc, img, size } = req.body;
        //POST METHOD  TO CREATE SITE
        if (
            name.trim().length < 200 &&
            id.trim().length < 200 &&
            logo.trim().length < 50 && 
            price > 0 &&
            qty > 0 &&
            cat.trim().length <= 20 &&
            dsc.trim().length <= 100 &&
            filename.trim().length <= 100 &&
            img.trim().length <= 300 &&
            size > 0
    ){ 
        if (req.method == 'POST'){
                    
                    const decodedToken = await auth.verifyIdToken(token)
                    const uid = decodedToken.uid
                    const existDocSnap = await db.collection("sites").doc(logo).get()
                    if (existDocSnap.exists){
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                        
                        if (adminStatus.length){
                            // send entire admins
                            if (adminStatus[0].level >= 2) {
                                    const defaultStorage = storage.bucket()
                                    const file = defaultStorage.file(`public/${logo}/files/${filename}`)
                                    await file.delete()
                                    /*add new product */
                                    await db.collection("stores").doc(logo).collection("products").doc(id).delete()
                                    //upate usedSub field of the site config
                                    await db.collection("sites").doc(logo).set({
                                        ...existDocSnap.data(),
                                        usedSub: existDocSnap.data().usedSub-size
                                    })
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