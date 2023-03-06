import express from "express"


const router = express.Router()

//router.get("/transactions", authUser, authorization(role.ADMIN), async(req,res)=>{
router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success"
    })
})

export default router