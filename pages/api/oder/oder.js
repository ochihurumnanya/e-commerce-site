//end point
//pages/api/user  (to create new user)

import { db, auth } from "../../../utils/db";
import dayjs from 'dayjs'



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
            products: getCartItems()
     */

try{

        const { token, address, contact, customer, logo, products } = req.body;
        //POST METHOD  TO CREATE SITE
        if (
            address.trim().length < 500 && 
            logo.trim().length < 50 &&
            contact.trim().length < 300 &&
            customer.trim().length < 200 &&
            products.length > 0
        ){ 
        if (req.method == 'POST'){
                    const decodedToken = await auth.verifyIdToken(token)
                    const uid = decodedToken.uid
                    const existDocSnap = await db.collection("sites").doc(logo).get()
                    if (existDocSnap.exists){
                                    const now = dayjs()
                                    const createdAt = now.toString()
                                    /*add new product */
                                    const { id } = await db.collection("stores").doc(logo).collection("oders").add({
                                        uid: uid,
                                        address: address,
                                        status: "pending",
                                        contact: contact,
                                        customer: customer,
                                        products: JSON.stringify(products),
                                        createdAt: createdAt
                                    })
                                    
                                    //success
                                    res.status(200).json({message: "success"})
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