import express from "express"
const router = express.Router()
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from "fs";
import serviceAccount from "../utils/serviceAccount.js";
import documentModel from "../models/document.model.js";
import multer, { MulterError } from 'multer'

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

const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('application/')) {
            cb(null, true)
        } else {
            cb(new MulterError('Only application files are allowed!'), false)
        }
    },
})

router.post("/upload", upload.single('file'), async(req,res)=>{
    const bucket = serviceAccount.storage().bucket();
    console.log(123)
    try {
        const file = req.file
        if (!file) {
            res.status(400).json({
                success: false,
                message: 'No file uploaded.',
                result: {},
            })
            return
        }

        const userFolderName = `user/${req.headers.user_id}/documents`
        const filePath = `${userFolderName}/${file.originalname}`

        const blob = bucket.file(filePath)
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        })

        blobStream.on('error', (err) => {
            console.error(err)
            res.status(500).json({
                success: false,
                message: 'Unable to upload file, please try again later.',
                result: {},
            })
        })

        blobStream.on('finish', () => {
            blob
                .getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Thời gian hết hạn của URL (ở đây là 1 năm)
                })
                .then((signedUrls) => {
                    console.log(
                        `File uploaded successfully. Signed URL: ${signedUrls[0]}`
                    )

                    // Trả về thông tin của file vừa upload
                    res.status(200).json({
                        success: true,
                        message: 'File uploaded successfully',
                        result: {
                            document: {
                                file_name: file.originalname,
                                file_url: signedUrls[0],
                            },
                        },
                    })
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({
                        success: false,
                        message: 'Có lỗi xảy ra khi lấy signed URL',
                        result: {},
                    })
                })
        })

        blobStream.end(file.buffer)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Unable to upload file, please try again later.',
            result: {},
        })
    }
})

export default router