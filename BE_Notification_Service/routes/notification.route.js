import express from "express";
import sendEmail from '../utils/email.js';
import firebase from '../utils/firebase/firebase_init.js'
import notificationModel from "../models/notification.model.js";


const router = express.Router()

//router.get("/transactions", authUser, authorization(role.ADMIN), async(req,res)=>{
router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success hehe"
    })
});

router.post('/forward', async (req, res) => {
    const data = req.body;
    const recipientList = data.state.recipientList
    const filename = data.state.fileNamePdf
    const senderUI = data.userID
    console.log(data.state.isSignKey)

    ////// get info + send email
    const usersCollection = firebase.firestore().collection('users')
    const senderName = await usersCollection.where('userId', '==', senderUI)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('No user found with id: ', senderUI);
            } else {
                // There should only be one user with the given email
                const userDoc = querySnapshot.docs[0];
                const name = userDoc.data().full_name;
                return name
            }
        })
        .catch((error) => {
            console.error('Error getting user with email', email, ':', error);
        });

    const recieverName = []
    const permission = []
    const userReceiveID = []
    const isComplete = []
    for (const c of recipientList) {
        isComplete.push(0)
        await usersCollection.where('email', '==', c.email)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log('No user found with email:', c.email);
                } else {
                    // There should only be one user with the given email
                    const userDoc = querySnapshot.docs[0];
                    const fullname = userDoc.data().full_name;
                    const receiverID = userDoc.data().userId;
                    recieverName.push(fullname)
                    permission.push(c.permission)
                    userReceiveID.push(receiverID)

                    const VERIFY_EMAIL_SUBJECT = `SignaText: ${c.permission} a document`;
                    let per = ""
                    if (c.permission == "Needs to view") {
                        per = "view"
                    } else {
                        per = "sign"
                    }

                    let MESSAGE = ""                
                    if (per == "sign") {
                        MESSAGE = `
                        Dear ${fullname},\n
                        ${senderName} sent you a document to ${per}!\n
                        Please access this link to sign the document: http://localhost:5173/document/other/signPDF?owner=${senderUI}&filename=${filename}&isSignKey=${data.state.isSignKey}`;
                    } else if (per == "view") {
                        MESSAGE = `
                        Dear ${fullname},\n
                        ${senderName} sent you a document to ${per}!\n
                        Please access this link to view the document: http://localhost:5173/document/list`;
                    }
                    sendEmail(c.email, VERIFY_EMAIL_SUBJECT, MESSAGE);
                }
            })
            .catch((error) => {
                console.error('Error getting user with email', c.email, ':', error);
            });
    }

    /// add to doclist
    const docList = {
        date: new Date(),
        filename,
        senderName,
        receiverName: recieverName,
        permission,
        userCreateID: senderUI,
        userReceiveID,
        isComplete,
        status: 0
    }
    if (data.state.isSignKey == false) {
        const docListCollection = await firebase.firestore().collection('docslist')

        docListCollection
            .add(docList)
            .then((docRef) => {
                console.log('New user document added with ID:', docRef.id);
            })
            .catch((error) => {
                console.error('Error adding new user document:', error);
            });
    }
    else if (data.state.isSignKey == true) {
        console.log(await notificationModel.addNewDoc(docList))
    }

    

    return res.json({
        status: true,
        message: "Sent successfully!"
    });
});

export default router
