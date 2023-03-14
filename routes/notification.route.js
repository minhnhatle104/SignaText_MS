import express from "express";
import sendEmail from '../utils/email.js';

const router = express.Router()

//router.get("/transactions", authUser, authorization(role.ADMIN), async(req,res)=>{
router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success"
    })
});

router.post('/', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const userId = req.body.user_id;
    const documentId = req.body.document_id;

    const VERIFY_EMAIL_SUBJECT = 'SignaText: Sign a document';
    const MESSAGE = `
            Dear ${name},\n
            Dang Duy Khang sent you a document to review and sign\n
            Please access this link to sign the document: http://localhost:5173/document/other/signPDF`;

    sendEmail(email, VERIFY_EMAIL_SUBJECT, MESSAGE);

    return res.json({
        message: "Sent successfully!"
    });
});

export default router
