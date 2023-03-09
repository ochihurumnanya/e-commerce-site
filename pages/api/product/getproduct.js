
import { db } from "../../../utils/db";

export default async (req, res) => {
    const { logo, cat } = req.body;
        try{
            if (req.method == 'POST'){
                
                //console.log(logo)
                if ( logo.trim().length < 50 && cat.trim().length < 100 ){ 
                    const productRef = db.collection("stores").doc(logo).collection("products")
                    if(cat == "All") {
                        //get all products
                        const productsSnap = await productRef.get()
                        const products = []
                        productsSnap.forEach((doc)=>{
                            products.push({
                            ...doc.data(), id: doc.id
                            })
                        })
                        res.status(200).json(products)
                    } else {
                        //get products category asigned to admin
                        const productsSnap = await productRef.where('cat', '==', cat).get()
                        const products = []

                        productsSnap.forEach((doc)=>{
                            products.push({
                            ...doc.data(), id: doc.id
                            })
                        })
                        res.status(200).json(products)
                    }
                } else {
                    res.status(401).json({message: "invalid storage"})
                }
            }
        }catch(error){
            console.log(error)
            console.log("get product error")
            res.status(501).json({message: "An error occured"})
        }
}
    