import express from "express"
import authenticationModel from "../models/authentication.model.js"
import crypto from "crypto"
const router = express.Router()

router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success heheehehe"
    })
})

router.post("/addUser", async (req, res) => {
    const newUser = req.body.newUser || {}
    //Vy có thể thêm attribute  liên quan tới key ở đây nha.
    if (newUser == "") {
        return res.status(401).json({
            "message": "Invalid User's Information."
        })
    }
    const isExisted = await authenticationModel.isEmailExist(newUser.email)
    if (isExisted == true) {
        return res.status(401).json({
            "message": "User already existed!",
            "isSuccess": false
        })
    } else {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        newUser.publicKey = publicKey
        newUser.privateKey = privateKey
        await authenticationModel.addNewAccount(newUser)
        return res.status(200).json({
            newUser,
            "isSucess": true
        })
    }
})

export default router