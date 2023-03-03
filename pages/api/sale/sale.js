//end point
//pages/api/user  (to create new user)
import admin from 'firebase-admin'
import { db, auth } from "../../../utils/db";
import dayjs from 'dayjs'
import { increment } from "firebase/firestore";






export default async (req, res) => {
    /**
     *  //id: "12356",
            token: appuser.token,
            address: fields.address,
            status: "pending",
            date: "",//to be created and returned by server
            contact: fields.email+", "+fields.phone,
            customer: fields.name, //customers name
            staff: "", //this should be set on server side
            products: getCartItems() //array of all products
     */
try{
        /*
            oderId - represents the oder being processed so that it can be deleted
            after processing
        */
        const { token, address, contact, customer, logo, oderId, products, discount } = req.body;
        //POST METHOD  TO CREATE SITE
        if (
            address.trim().length < 500 && 
            logo.trim().length < 50 &&
            contact.trim().length < 300 &&
            customer.trim().length < 200 &&
            products.length > 0 &&
            discount >= 0
        ){ 
        if (req.method == 'POST'){
                    const now = dayjs()
                    const createdAt = now.toString()
                    const qdate = now.format("YYYY-MM-DD")
                    const decodedToken = await auth.verifyIdToken(token)
                    const uid = decodedToken.uid
                    const userRecord = await auth.getUser(uid)

                    //userRecord.displayName
                    const existDocSnap = await db.collection("sites").doc(logo).get()
                    if (existDocSnap.exists){
                        const adminStatus = JSON.parse(existDocSnap.data().admins).filter((el) => el.uid === uid)
                        if(adminStatus[0]){
                            if (adminStatus[0].level >= 1) {
                                    //dd-mm-yyyy
                                    /*add new product */
                                    //console.log(products)
                                    
                                    products.forEach(product => {
                                        db.collection("stores").doc(logo).collection("products").doc(product.id).update({
                                            qty: admin.firestore.FieldValue.increment(-product.qty)
                                            //admin.firestore.FieldValue.increment(1)
                                        })
                                    });
                                    
                                    

                                    const { id } = await db.collection("stores").doc(logo).collection("sales").add({ 
                                            uid: uid,
                                            address: address,
                                            status: "paid",
                                            contact: contact,
                                            customer: customer,
                                            discount: discount,
                                            staff: userRecord.displayName,
                                            products: JSON.stringify(products),
                                            qdate: qdate, //salse query date
                                            createdAt: createdAt
                                    })


                                    const newSale = {
                                            uid: uid,
                                            address: address,
                                            status: "paid",
                                            contact: contact,
                                            customer: customer,
                                            discount: discount,
                                            staff: userRecord.displayName,
                                            products: JSON.stringify(products),
                                            qdate: qdate, //salse query date
                                            date: createdAt
                                    }

                                    
                                    if (oderId != "" && oderId.trim().length < 300){
                                        await db.collection("stores").doc(logo).collection("oders").doc(oderId).update({status: "paid"})
                                        //success
                                        res.status(200).json(newSale)
                                    } else {
                                        //success
                                        res.status(200).json(newSale)
                                    }
                                
                            } else {
                                console.log("invalid access")
                                res.status(400).json({message: "invalid access"})
                            }
                        } else {
                            console.log("not an admin")
                            res.status(400).json({message: "invalid access"})
                        }          
                    } else {
                            console.log("not exist")
                            res.status(400).json({message: "invalid operation"})
                    }
                }  
        } else {
            console.log("not validated")
            res.status(400).json({message: "invalid operation"})
        }    
    }catch(error){
        console.log(error)
        res.status(400).json({message: "invalid operation"})
    }

}