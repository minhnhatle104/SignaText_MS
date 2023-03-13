import express from "express"
import documentModel from "../models/document.model";

const router = express.Router()

router.get("/:userId", async(req,res)=>{
    try {
        const userId = +req.params.userId || 0;
        if (userId > 0){
            const listSelfMade = await documentModel.listSelfMade(userId);
            const listOtherMade = await documentModel.listOtherMade(userId);
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

})

export default router