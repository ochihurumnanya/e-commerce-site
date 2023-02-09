//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { db } from "../../utils/db";
import moment  from "moment"

export default async (req, res) => {

try{
             //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
            const { logo, name, price, qty, cat, dsc, img, size } = req.body;
            if (
                    name.trim().length < 200 && 
                    logo.trim().length < 50 && 
                    price > 0 &&
                    qty > 0 &&
                    cat.trim().length <= 20 &&
                    dsc.trim().length <= 100 &&
                    img.trim().length <= 300 &&
                    size > 0
            ){ 
                
                const existDocSnap = await db.collection("sites").doc(logo).get()
                    
                if (existDocSnap.data().usedSub + size <= existDocSnap.data().subscription ) {
                    const now = moment().toDate()
                     /*add new product */
                    const { id } = await db.collection("stores").doc(logo).collection("products").add({
                        name: name,
                        price: price,
                        qty: qty,
                        cat: cat,
                        dsc: dsc,
                        img: img,
                        size: size,
                        createdAt: now 
                     })
                     
                     //upate usedSub field of the site config
                     await db.collection("sites").doc(logo).set({
                        ...existDocSnap.data(),
                        usedSub: existDocSnap.data().usedSub+size
                     })

                     const newProduct = 
                        {
                            id: id,
                            name: name,
                            price: price,
                            qty: qty,
                            cat: cat,
                            dsc: dsc,
                            img: img,
                            size: size,
                            createdAt: now 
                         }
                    
                    //success
                    res.status(200).json(newProduct)

                } else {
                    res.status(400).json({message: "invalid operation"})
                }

            }else{
                res.status(400).json({message: "invalid operation"})
            }
        }  else if (req.method == 'PUT'){
            //id is product id
            const { id, logo, name, price, qty, cat, dsc, img, size } = req.body;
            if (
                    name.trim().length < 200 &&
                    id.trim().length < 300 &&
                    logo.trim().length < 50 && 
                    price > 0 &&
                    qty > 0 &&
                    cat.trim().length <= 20 &&
                    dsc.trim().length <= 100 &&
                    img.trim().length <= 300 &&
                    size > 0
            ){ 
                
                const existDocSnap = await db.collection("sites").doc(logo).get()
                    
                if (existDocSnap.data().usedSub + size <= existDocSnap.data().subscription ) {
                    const now = moment().toDate()
                     /*add new product */
                    await db.collection("stores").doc(logo).collection("products").doc(id).set({
                        name: name,
                        price: price,
                        qty: qty,
                        cat: cat,
                        dsc: dsc,
                        img: img,
                        size: size,
                        createdAt: now 
                     })

                      //upate usedSub field of the site config
                      await db.collection("sites").doc(logo).set({
                        ...existDocSnap.data(),
                        usedSub: existDocSnap.data().usedSub+size
                      })

                     const updatedProduct = {
                        id: id,
                        name: name,
                        price: price,
                        qty: qty,
                        cat: cat,
                        dsc: dsc,
                        img: img,
                        size: size,
                        createdAt: now 
                     }
                     res.status(200).json(updatedProduct)
                     
                 } else{
                    res.status(401).json({message: "invalid storage"})
                 }
            }else{
                    res.status(401).json({message: "invalid operation"})
            }
        }
    }catch(error){
        res.status(501).json({message: "An error occured"})
        console.log(error)
    }

}