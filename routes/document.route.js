import express from "express"
const router = express.Router()
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from "fs";
import serviceAccount from "../utils/serviceAccount.js";
import documentModel from "../models/document.model.js";

// router.get("/user/:userId",async (req,res)=>{
//     const userId = req.params.userId;
//     const collectionUser = serviceAccount.firestore().collection("users");
//     const findUser = collectionUser.where('userId','==',userId).get()
//         .then((snapshot)=>{
//             if (snapshot.size > 0){
//                 const nameArray = [];
//                 snapshot.forEach((doc)=>{
//                     const docData = doc.data();
//                     nameArray.push(docData.full_name)
//                 })
//                 return res.status(200).json({
//                     username: nameArray[0]
//                 })
//             }
//             else{
//                 return res.status(400).json({
//                     username: ''
//                 })
//             }
//         })
// })


//Lấy danh sách doc do mình tạo
router.get("/owned/:userId", async(req,res)=>{
    try {
        const dbDocsList = await serviceAccount.firestore().collection("docslist");
        const userId = req.params.userId;
        if (userId !== ''){
            const docsArray = [];
            const ownDocs = dbDocsList.where('userCreateID','==',userId).get().then(snapshot=>{
                snapshot.forEach(doc => {
                    const docData = doc.data();
                    const timestamp = docData.date._seconds;
                    const newObj = {
                        formatDate: documentModel.convertTimeStampToDate(timestamp),
                        formatHour: documentModel.convertTimeStampToTime(timestamp),
                        ...docData
                    }
                    docsArray.push(newObj);
                });
                return res.status(200).json({
                    isSuccess: true,
                    message: "successful",
                    list: docsArray
                })

            }).catch(error =>{
                return res.status(400).json({
                    isSuccess: false,
                    message: error
                })
            })
        }
        else{
            return res.status(400).json({
                isSuccess: false,
                message: "Unauthorized"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: error.message
        })
    }

})
//Lấy danh sách doc do người khác gửi
router.get("/other/:userId", async(req,res)=>{
    try {
        const dbDocsList = serviceAccount.firestore().collection("docslist");
        const userId = req.params.userId;
        if (userId !== ''){
            const docsArray = [];
            const ownDocs = dbDocsList.where('userReceiveID','==',userId).get().then(snapshot=>{

                snapshot.forEach(doc => {
                    const docData = doc.data();
                    const timestamp = docData.date._seconds;
                    const newObj = {
                        formatDate: documentModel.convertTimeStampToDate(timestamp),
                        formatHour: documentModel.convertTimeStampToTime(timestamp),
                        ...docData
                    }
                    docsArray.push(newObj);
                });
                return res.status(200).json({
                    isSuccess: true,
                    message: "successful",
                    list: docsArray
                })

            }).catch(error =>{
                return res.status(400).json({
                    isSuccess: false,
                    message: error
                })
            })
        }
        else{
            return res.status(400).json({
                message: "Unauthorized",
                userid: req.params.userId
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

})
//Xóa doc
router.delete("/:id",async (req,res)=>{
    try {
        const dbDocsList = serviceAccount.firestore().collection("docslist");
        const docId = +req.params.id || 0;
        if (docId > 0){
            const query = dbDocsList.where('Id','==',docId).get()
                .then((querySnapshot)=>{
                    if(querySnapshot.size > 0){
                        querySnapshot.forEach((doc)=>{
                            doc.ref.delete();
                        })
                        return res.status(200).json({
                            isSuccess: true,
                            message: "Document is deleted"
                        })
                    }
                    else{
                        return res.status(400).json({
                            isSuccess: false,
                            message: "Document is not exist"
                        })
                    }
                })
        }
        else{
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid Id of Document"
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: error.message
        })
    }

})

router.post("/sign", async(req,res)=>{
    const fileName = req.body.fileName
    const signatureBytes = await fs.promises.readFile('./assets/test/khuong.png');

    const bucket = serviceAccount.storage().bucket();
    const file = bucket.file(fileName);

    file.download()
        .then(async data => {
            const buffer = data[0];
            const pdfDoc = await PDFDocument.load(buffer);
            const pages = pdfDoc.getPages();
            const currentPage = pages[req.body.current_page];

            const signatureImage = await pdfDoc.embedPng(signatureBytes);
            const signatureImageWidth = signatureImage.width
            const signatureImageHeight = signatureImage.height
            const signatureImageX = req.body.x_coor*currentPage.getWidth();
            const signatureImageY = req.body.y_coor*currentPage.getHeight();

            // Add the signature image to the first page
            currentPage.drawImage(signatureImage, {
                x: signatureImageX,
                y: signatureImageY,
                width: signatureImageWidth,
                height: signatureImageHeight,
            });


            const pdfBytesWithSignature = await pdfDoc.save();
            const newBuffer = Buffer.from(pdfBytesWithSignature);
            const bucket = serviceAccount.storage().bucket();
            const file = bucket.file(fileName);

            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'application/pdf', // thay đổi kiểu content tương ứng
                },
                resumable: false,
            });

            stream.on('error', err => console.log(err));
            stream.on('finish', () => console.log(`File ${fileName} uploaded to firebase.`));

            stream.end(newBuffer);
            return res.status(200).json({
                message: "Success"
            })
        })
        .catch(err => console.log(err));
})
router.post("/fileDimension", async(req,res)=>{
    const fileName = req.body.fileName
    const imageName = req.body.imageName
    if (fileName == undefined){
        return res.status(200).json({
            message: "Please provide file name!"
        })
    }

    const bucket = serviceAccount.storage().bucket();
    const file = bucket.file(fileName);

    file.download()
        .then(async data => {
            const buffer = data[0];
            const pdfDoc = await PDFDocument.load(buffer);
            fs.writeFileSync('signed.pdf', await pdfDoc.save());

            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            const signatureBytes = await fs.promises.readFile(imageName);
            const signatureImage = await pdfDoc.embedPng(signatureBytes);
            const signatureImageWidth = signatureImage.width
            const signatureImageHeight = signatureImage.height


            return res.status(200).json({
                fileWidth: firstPage.getWidth(),
                fileHeight: firstPage.getHeight(),
                imageWidth: signatureImageWidth,
                imageHeight: signatureImageHeight,
                message: "success"
            })
        })
        .catch(err => console.log(err));
})

router.get("/test", async(req,res)=>{
    const bucket = serviceAccount.storage().bucket();
    const filePath = process.cwd() + '/assets/test/07.pdf'
    const file = bucket.file('user/jGzIwPIXM7RGcvvbDpJ10JYewUw1/documents/Nhom.pdf');

    file.save(fs.readFileSync(filePath), {
        metadata: {
            contentType: 'application/pdf'
        }
    }, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('File uploaded successfully.');
        }
    });
    return res.status(200).json({
        message: "success"
    })
})

export default router