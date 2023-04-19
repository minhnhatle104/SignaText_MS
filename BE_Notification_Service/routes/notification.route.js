import express from "express";
import sendEmail from '../utils/email.js';
import firebase from '../utils/firebase/firebase_init.js'


const router = express.Router()

//router.get("/transactions", authUser, authorization(role.ADMIN), async(req,res)=>{
router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success"
    })
});

router.post('/forward', async (req, res) => {
    const data = req.body;
    const recipientList = data.state.recipientList
    const filename = data.state.fileNamePdf
    const senderUI = data.userID

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
    for (const c of recipientList){
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
                    const per = c.Permission == "Needs to view"?"view":"sign"
                    const MESSAGE = `
                        Dear ${fullname},\n
                        ${senderName} sent you a document to ${per}!\n
                        Please access this link to sign the document: https://fe-docusign.vercel.app/document/other/signPDF`;
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
        status: 0
    }
    console.log(docList)
    const docListCollection = firebase.firestore().collection('docslist')

    docListCollection
        .add(docList)
        .then((docRef) => {
            console.log('New user document added with ID:', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding new user document:', error);
        });

    return res.json({
        status: true,
        message: "Sent successfully!"
    });
});

export default router
