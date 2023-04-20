import express from "express"

const router = express.Router()
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from "fs";
import serviceAccount from "../utils/serviceAccount.js";
import documentModel from "../models/document.model.js";
import multer, { MulterError } from 'multer'
import https from 'https'
import stream from 'stream'
import os from 'os'
import path from 'path'
import mongoDb from "../utils/mongo.db.js";
import randomstring from 'randomstring'


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

                for (const c of docsArray){
                    c.infoReceive = []
                    for (let i = 0; i < c.receiverName.length; i++){
                        const str = c.receiverName[i] + " - " + c.permission[i]
                        c.infoReceive.push(str)
                    }
                }

                docsArray.sort((a, b) => b.date - a.date)
                return res.status(200).json({
                    isSuccess: true,
                    message: "successful",
                    list: docsArray
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
        const userId = req.params.userId || "";
        if (userId != ''){
            const docsArray = [];
            const ownDocs = dbDocsList.where('userReceiveID','array-contains', userId).get().then(snapshot=>{
            
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

                for (const c of docsArray){
                    c.infoReceive = []
                    for (let i = 0; i < c.receiverName.length; i++){
                        const str = c.receiverName[i] + " - " + c.permission[i]
                        c.infoReceive.push(str)
                    }
                    const dbUser = serviceAccount.firestore().collection("users");
                    dbUser.where('userId', '==', c.userCreateID).get().then(sub_snap => {
                        sub_snap.forEach(doc => {
                            c.createrName = doc.data().full_name
                        });
                    })
                }
                docsArray.sort((a, b) => b.date - a.date)
                return res.status(200).json({
                    isSuccess: true,
                    message: "successful",
                    list: docsArray
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
        const docId = req.params.id || ""
        console.log(docId)
        if (docId != ""){
            const query = dbDocsList.where('filename','==',docId).get()
                .then((querySnapshot)=>{
                    if (querySnapshot.size > 0) {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().userCreateID == req.user.user_id) { // đúng chủ sỡ hữu thì mới đc xóa
                                doc.ref.delete();
                            }
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
    const imageName = req.body.imageFile
    const isSignKey = req.body.isSignKey


    const bucket = serviceAccount.storage().bucket();
    const file = bucket.file(fileName);
    const real_filename = fileName.split("/")[3]

    // docslist trên firebase ==> không ký = key
    if (isSignKey == false) {
        try {
            const dbDocsList = serviceAccount.firestore().collection("docslist");
            const updateDocs = dbDocsList.where('filename','==',real_filename).get().then(snapshot=>{
                snapshot.forEach(async document => {
                    const docData = document.data();
                    if (req.user.user_id == docData.userCreateID) {
                        return
                    }
                    console.log("Not Owner")
    
                    const indexUserSign = docData.userReceiveID.indexOf(req.user.user_id)
                    if (docData.permission[indexUserSign] == "Needs to sign") {
                        docData.isComplete[indexUserSign] = 1
                    }
    
                    const indexSign = []
                    for (let i = 0; i < docData.permission.length; i++) {
                        if (docData.permission[i] == "Needs to sign") {
                            indexSign.push(i)
                        }
                    }
    
                    let isFinish = true
                    for (const c of indexSign) {
                        if (docData.isComplete[c] != 1) {
                            isFinish = false
                            break
                        }
                    }
                    console.log(isFinish)
    
                    if (isFinish == true) {
                        const documentRef = serviceAccount.firestore().collection('docslist').doc(document.id); // Replace with your own collection name and document ID
                        documentRef.update({status: 1, isComplete: docData.isComplete})
                        .then(() => {
                            console.log('Document updated successfully');
                        })
                        .catch((error) => {
                            console.error('Error updating document:', error);
                        });    
                    } else if (isFinish == false) {
                        const documentRef = serviceAccount.firestore().collection('docslist').doc(document.id); // Replace with your own collection name and document ID
                        documentRef.update({isComplete: docData.isComplete})
                        .then(() => {
                            console.log('Updated isComplete successfully');
                        })
                        .catch((error) => {
                            console.error('Error updating document:', error);
                        });    
                    }
                });
            })
        }catch (err) {
            console.log(err)
        }
    } else {
        // tìm phần từ có filename == real_filename
        // xét trường hợp:
        //TH1: xem req.user.user_id == userCreateID hay không? tức là chủ file --> nếu đúng skip.
        //
        
    }

    file.download()
        .then(async data => {
            const buffer = data[0];
            const pdfDoc = await PDFDocument.load(buffer);
            const pages = pdfDoc.getPages();
            const currentPage = pages[req.body.current_page];

            https.request(imageName, async function(response) {
                const Stream = stream.Transform
                var data = new Stream() ;

                response.on('data', function(chunk) {
                    data.push(chunk);
                });

                response.on('end', async function() {
                    const signatureImage = await pdfDoc.embedPng(data.read());
                    const signatureImageWidth = signatureImage.width
                    const signatureImageHeight = signatureImage.height
                    const signatureImageX = req.body.x_coor*currentPage.getWidth();
                    const signatureImageY = req.body.y_coor*currentPage.getHeight();

                    // Add the signature image to the first page
                    currentPage.drawImage(signatureImage, {
                        x: signatureImageX,
                        y: signatureImageY,
                        width: signatureImageWidth >= 200? 200: signatureImageWidth ,
                        height: signatureImageHeight >=200?150: signatureImageHeight,
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
                    stream.on('finish', () => {
                        console.log("Success")
                    });
                    stream.end(newBuffer);
                    return res.status(200).json({
                        message: "Success"
                    })
                });
            }).end()
        })
        .catch(err => console.log(err));
})
router.post("/fileDimension", async(req,res)=>{
    const fileName = req.body.fileName
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
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            return res.status(200).json({
                fileWidth: firstPage.getWidth(),
                fileHeight: firstPage.getHeight(),
                message: "success"
            })
        })
        .catch(err => console.log(err));
})

router.post("/imgDimension", async(req,res)=>{
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

            https.request(imageName, async function(response) {
                const Stream = stream.Transform
                var data = new Stream() ;

                response.on('data', function(chunk) {
                    data.push(chunk);
                });

                response.on('end', async function() {
                    const signatureImage = await pdfDoc.embedPng(data.read());
                    const signatureImageWidth = signatureImage.width
                    const signatureImageHeight = signatureImage.height
                    // fs.writeFileSync('image.png', data.read());
                    return res.status(200).json({
                        imageWidth: signatureImageWidth >= 200?200:signatureImageWidth,
                        imageHeight: signatureImageHeight >= 200?150:signatureImageHeight,
                        message: "success",
                        imgUrl: imageName
                    })
                });
            }).end();
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

router.post("/upload", upload.single('file'), async (req, res) => {
    const bucket = serviceAccount.storage().bucket();
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


        const userFolderName = `user/${req.user.user_id}/documents`
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

router.get('/download/:id', async (req, res) => {
    const documentId = req.params.id || ""
    const dbDocsList = serviceAccount.firestore().collection("docslist")
    const bucket = serviceAccount.storage().bucket()

    if (documentId.length > 0) {
        const query = dbDocsList.where('filename', '==', documentId)
            .get()
            .then(querySnapShot => {
                console.log(querySnapShot)
                if (querySnapShot.size > 0) {
                    querySnapShot.forEach(doc => {
                        const fileName = doc._fieldsProto.filename.stringValue
                        console.log(fileName)
                        const firebaseFilePath = `user/${doc._fieldsProto.userCreateID.stringValue}/documents/${fileName}`
                        // const localFilePath = `C:\\${fileName}`
                        const localFilePath = path.join(os.homedir(), `Downloads/${fileName}`);
                        const file = bucket.file(firebaseFilePath)

                        file.createReadStream()
                            .pipe(fs.createWriteStream(localFilePath))
                            .on('response', response => {
                                response.headers['content-type'] = 'application/pdf'
                            })
                            .on('error', err => {
                                return res.status(400).json({
                                    message: 'Can not download this document!'
                                })
                            })
                            .on('finish', () => {
                                console.log('Finished');
                            })
                    })
                }
                else {
                    return res.status(400).json({
                        message: 'The document does not exist!'
                    })
                }
            })
        return res.json({
            message: 'Your file is in Downloads folder!'
        })
    }
    else {
        return res.status(400).json({
            message: 'The document does not exist!'
        })
    }
})

router.get('/docslist/key', async (req, res)=>{
    const userID = req.query.userId
    if (userID == undefined){
        return res.json({
            message: "UserId is invalid!"
        })
    }else{
        const doclist = await mongoDb.collection('DocsList').find({"userCreatedID": userID}).toArray()
        return res.status(200).json({
            message: "Success",
            doclist,
        })
    }
})

router.post('/docslist/key', async (req, res)=>{
    const randomArr = ["asdasdw3ead", "ncbnzxawdewada",  "zxczxczxczxc", "jjkaj78567kkas93", "123exasfdg976745", "asdo89asdasdeaksd", "asdwrtgdscadsc", "zxcasdfwaeawdsa", "asjdhasdhasjdhasd", "asdkjasdjaksjd", "092384jsadasd", "12093jsajnsadnjnxcx", "aasdjmzxhag62a"]
    const randomRev = ["xzxcxzcasdasd", "xzczxczxczxc",  "12312asdasd", "zxczxczxczxcxzczxc", "dsfsdbfrg55", "cxzcasdq2es", "asdasxzxz", "asfcsxfdsgty", 'nznzxbhags72636723', "908237wa6asgsasas", "asldjasdijiweu90", "23098432hsnxzx", "asmdjasdmjaskdjiuewd"]



    const final_arr = []
    for (let i = 0; i < 20000; i++){
        const index1 = Math.floor(Math.random() * (12 - 0 + 1) ) + 0;
        const index2 = Math.floor(Math.random() * (12 - 0 + 1) ) + 0;
        const tmp = {
            date: new Date(),
            filename: randomstring.generate() + ".pdf",
            senderName: "Nguyen Vu Duy Khuong",
            receiverName: ["Nguyen Ba Long", "Hoang Kim Lan"],
            permission: ["Needs to sign", "Needs to view"],
            userCreatedID: randomArr[index1],
            userReceiveID: [randomRev[index1], randomRev[index2]]
        }
        final_arr.push(tmp)
    }

    await mongoDb.collection("DocsList").insertMany(final_arr);
    return res.status(200).json({
        message: "Success",
    })
})

router.post('/getSignedURL', async (req, res) => {
    try {
        const filename = req.body.filename
        const uid = req.body.uid
        const revID = req.body.revID || ""
        const dbDocsList = await serviceAccount.firestore().collection("docslist");
        let isOwner = false
        let isView = false
        let isSign = false


        const ownDocs = dbDocsList.where('filename', '==', filename).get().then(snapshot => {
            snapshot.forEach(doc => {
                const docData = doc.data();
                console.log(docData.userCreateID)
                console.log(uid)

                if (docData.userCreateID == uid) {
                    console.log("match")
                    isOwner = true
                }

                if (revID != "") {
                    const revIndex = docData.userReceiveID.indexOf(revID)
                    console.log(revIndex)
                    const perRev = docData.permission[revIndex]
                    if (perRev == "Needs to view") {
                        isView = true
                    }
                    else if (perRev == "Needs to sign") {
                        isSign = true
                    }
                }
                
                 
            });
            const bucket = serviceAccount.storage().bucket();
            const file = bucket.file(`user/${uid}/documents/${filename}`); // Replace with your file path
            const options = {
                action: 'read',
                expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Thời gian sống của đường dẫn (định dạng MM-DD-YYYY)
            };
            
            file.getSignedUrl(options).then(signedUrls => {
                return res.status(200).json({
                    message: "Success",
                    signedURL: signedUrls[0],
                    isOwner,
                    isView,
                    isSign
                })
            }).catch(error => {
            console.error('Error generating signed URL:', error);
            });
        })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        result: {},
      })
    }
  })

export default router
