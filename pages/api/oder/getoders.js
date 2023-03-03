import { db, auth } from "../../../utils/db";


export default async (req, res) => {
try{
        //admin true/false
        const { token, logo, admin } = req.body;
        //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
                    const decodedToken = await auth.verifyIdToken(token)
                    const uid = decodedToken.uid
                    const oderRef = db.collection("stores").doc(logo).collection("oders")
                    const oders = []

                    if (!admin) {
                        const snapshot = await oderRef.where('uid', '==', uid).get()
                        if (!snapshot.empty) {
                            snapshot.forEach(doc => {
                                oders.push({...doc.data(), staff: "", date: doc.data().createdAt, products: JSON.parse(doc.data().products), id: doc.id})
                            })
                            res.status(200).json({oders: oders})
                        } else {
                            res.status(200).json({oders: oders})
                        }      
                    } else {
                        const existDocSnap = await db.collection("sites").doc(logo).get()
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                        
                        if (adminStatus[0].level >= 1) {
                            const snapshot = await oderRef.where('status', '==', "pending").get()
                            if (!snapshot.empty) {
                                snapshot.forEach(doc => {
                                    oders.push({
                                        id: doc.id,
                                        address: doc.data().address,
                                        contact: doc.data().contact,
                                        customer: doc.data().customer,
                                        status: doc.data().status,
                                        staff: "",
                                        products: JSON.parse(doc.data().products),
                                        date: doc.data().createdAt
                                    })
                                })
                                res.status(200).json({oders: oders})
                            } else {
                                res.status(200).json({oders: oders})
                            }    
                        } else {
                            res.status(400).json({message: "invalid operation"})
                        }
                    }  
        } 
    }catch(error){
        console.log(error)
        res.status(400).json({message: "invalid operation"})
    }

}