import express from "express"
import documentModel from "../models/document.model.js";
const router = express.Router()
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from "fs";
import serviceAccount from "../utils/serviceAccount.js";
import http from 'http'
import https from 'https'

router.get("/list/:userId", async(req,res)=>{
    try {
        const userId = +req.params.userId || 0;
        if (userId > 0){

        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

})

router.post("/sign", async(req,res)=>{
    const pdfBytes = await fs.promises.readFile('./assets/test/07.pdf');

    const signatureBytes = await fs.promises.readFile('./assets/test/khuong.png');

    // Create a new PDF document from the existing file
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Embed the font
    // const helveticaFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[req.body.current_page];

    // Calculate the position and size of the signature image
    const signatureImage = await pdfDoc.embedPng(signatureBytes);
    const signatureImageWidth = signatureImage.width
    const signatureImageHeight = signatureImage.height
    const signatureImageX = req.body.x_coor*firstPage.getWidth();
    const signatureImageY = req.body.y_coor*firstPage.getHeight();

    // Add the signature image to the first page
    firstPage.drawImage(signatureImage, {
        x: signatureImageX,
        y: signatureImageY,
        width: signatureImageWidth,
        height: signatureImageHeight,
    });

    // Add the signature text to the first page
    // const signatureText = 'Signed by Khuong';
    // // const signatureTextWidth = helveticaFont.widthOfTextAtSize(signatureText, 12);
    // const signatureTextX = firstPage.getWidth() - signatureImageWidth - 100;
    // const signatureTextY = 60 + signatureImageHeight;
    // firstPage.drawText(signatureText, {
    //     x: signatureTextX,
    //     y: signatureTextY,
    //     size: 12,
    //     color: rgb(0, 0, 0),
    // });

    // Serialize the PDF document and download it
    const pdfBytesWithSignature = await pdfDoc.save();
    fs.writeFileSync('signed.pdf', pdfBytesWithSignature);
    return res.status(200).json({
        message: "success"
    })
})
router.post("/fileDimension", async(req,res)=>{
    const fileName = req.body.fileName
    const imageName = req.body.imageName
    if (fileName == undefined){
        return res.status(200).json({
            message: "Please provide file name!"
        })
    }

    const urlObj = new URL(fileName);
    const httpModule = urlObj.protocol === 'https:' ? https : http;

    try {
        httpModule.get(fileName, (result) => {
            let data = '';

            result.on('data', (chunk) => {
                data += chunk;
            });

            result.on('end', async () => {
                const uint8Array = new TextEncoder().encode(data);
                const pdfDoc = await PDFDocument.load(uint8Array);

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

            });
        }).on('error', (err) => {
            console.error(`Error downloading PDF file from ${fileName}: ${err}`);
        });
    }catch (e){
        return res.status(200).json({
            message: "error"
        })
    }

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