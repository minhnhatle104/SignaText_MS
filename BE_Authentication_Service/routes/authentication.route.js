import express from "express"
import authenticationModel from "../models/authentication.model.js"

const router = express.Router()

router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success hhehe"
    })
})

router.post("/addUser", async (req, res) => {
    const newUser = req.body.newUser || ""
    newUser._id = req.user.user_id
    newUser.email = req.user.email

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
        await authenticationModel.addNewAccount(newUser)
        return res.status(200).json({
            newUser,
            "isSucess": true
        })
    }
})

export default router