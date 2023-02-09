//end point
//pages/api/user  (to create new user)
//import { db, auth } from "../../../utils/db";
import { db } from "../../utils/db";
import moment  from "moment"

export default async (req, res) => {

    try{
             //POST METHOD  TO CREATE SITE
        if (req.method == 'POST'){
            const { userEmail, uid, userName, logoImg, logo, code, color, btnColor, currency, minProduct, about, shopDsc, contact} = req.body;
            
            if (uid.trim().length < 400 &&
                    userEmail.trim().length < 200 &&
                    logoImg.trim().length < 400 && 
                    logo.trim().length < 50 && 
                    color.trim().length <= 10 &&
                    btnColor.trim().length <= 10 &&
                    currency.trim().length <= 15 &&
                    minProduct.length >= 0 &&
                    about.trim().length <= 500 &&
                    shopDsc.trim().length <= 300 &&
                    contact.address.trim().length <= 200 &&
                    contact.phone.length <= 20 &&
                    contact.email.trim().length <= 100
            ){ 

                const existDocSnap = await db.collection("sites").doc(logo).get()
                if(!existDocSnap.exists){
                    const now = moment()
                    const created = now.toDate()
                    const oneYearFromNow = now.add(1, 'year').toDate()

                     /*create new site */
                     await db.collection("sites").doc(logo).set({
                            uid: uid,
                            active: true,
                            logo: logo,
                            referedCode: code.trim().length >= 3 &&  code.trim().length <= 50 ? code : "",
                            createdAt: created,
                            subExpDate: oneYearFromNow,
                            subscription: 15,
                            usedSub: 0, //used subscription
                            credit: 0,
                            admins: JSON.stringify([ //admins will be added by api dynamically
                                    {
                                        name: userName,
                                        email: userEmail,
                                        level: 3
                                    }  
                                ]),
                            siteConfig: JSON.stringify({
                                logoImg: logoImg,
                                logo: logo,
                                color: color,
                                btnColor: btnColor,
                                currency: currency, 
                                minProduct: minProduct,
                                about: about,
                                shopDsc: shopDsc,
                                contact: contact,  //contact: {address: address, phone: phone, email: email
                        })
                    })
                 

                    /*create new store */

                    await db.collection("stores").doc(logo).set({
                        uid: uid,
                        admin1:[],
                        admin2:[],
                        admin3:[userEmail]
                    });

                    //respons opject
                    const siteConfigs = {
                        logo: logo,
                        logoImg: logoImg,
                        color: color,
                        btnColor: btnColor,
                        about: about,
                        shopDsc: shopDsc,
                        currency: currency,
                        minProduct: minProduct,
                        subscription : true,
                        plan: 15, //15mb
                        usedPlan: 0, //total size of image storage mb used
                        contact: contact, //contact: {address: address, phone: phone, email: email}
                        admins: [ //admins will be added by api dynamically
                          {
                            name: userName,
                            email: userEmail,
                            level: 3
                          }  
                        ],
                    }
                    //success
                    res.status(200).json(siteConfigs)
                
                }else{
                        res.status(400).json({message: "invalid operation"})
                        //console.log({message: "site exist"})
                        //console.log(existDocSnap.data())
                }
            }else{
                res.status(400).json({message: "invalid operation"})
            }
        }  else if (req.method == 'PUT'){

                const { logoImg, logo, color, btnColor, currency, minProduct, about, shopDsc, contact, admins } = req.body;

                if (
                    logoImg.trim().length < 400 && 
                    logo.trim().length < 50 && 
                    color.trim().length <= 20 &&
                    btnColor.trim().length <= 50 &&
                    currency.trim().length <= 15 &&
                    minProduct > 0 &&
                    about.trim().length <= 500 &&
                    shopDsc.trim().length <= 300 &&
                    contact.address.trim().length <= 200 &&
                    contact.phone.length <= 20 &&
                    contact.email.trim().length <= 100
                ){
                    const existDocSnap = await db.collection("sites").doc(logo).get()
                    
                    if(existDocSnap.exists){
                        await db.collection("sites").doc(logo).set(
                            {
                                ...existDocSnap.data(),
                                siteConfig: JSON.stringify({
                                    logoImg: logoImg,
                                    logo: logo,
                                    color: color,
                                    btnColor: btnColor,
                                    currency: currency, 
                                    minProduct: minProduct,
                                    about: about,
                                    shopDsc: shopDsc,
                                    admins: admins,
                                    contact: contact  //contact: {address: address, phone: phone, email: email}
                                })
                            })
                            res.status(201).json({message:"updated successfully"})
                    } else {
                            res.status(400).json({message:"Error updating records"})  
                    }
                } else {
                    res.status(400).json({message:"Error updating records"}) 
                    console.log("faild validaetion")
                }
        }
    }catch(error){
        res.status(501).json({message: "An error occured"})
        console.log(error)
    }

}