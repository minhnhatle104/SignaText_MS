import express from "express"
import authenticationModel from "../models/authentication.model.js"
import forge from "node-forge"
const router = express.Router()

router.get("/test", async(req,res)=>{
    return res.status(200).json({
        message: "success"
    })
})


router.post("/addUser", async (req, res) => {
    const newUser = req.body.newUser || {}
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
        const keys = forge.pki.rsa.generateKeyPair(2048);
        const cert = forge.pki.createCertificate();

// Thông tin chứng chỉ
        const attrs = [{
            name: 'commonName',
            value: newUser.fullname
        }, {
            name: 'emailAddress',
            value: newUser.email
        }, {
            name: 'countryName',
            value: 'VN'
        }, {
            name: 'localityName',
            value: 'TP. HCM'
        }, {
            name: 'organizationName',
            value: 'Signa Text'
        }
        ];

        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        // cert.setExtensions([ {
        //     name : 'basicConstraints',
        //     cA : true
        // } ]);
        cert.sign(keys.privateKey);
        newUser.publicKey = forge.pki.publicKeyToPem(keys.publicKey)
        newUser.privateKey = forge.pki.privateKeyToPem(keys.privateKey)
        newUser.certificate = forge.pki.certificateToPem(cert)
        await authenticationModel.addNewAccount(newUser)
        return res.status(200).json({
            newUser,
            "isSucess": true
        })
    }
})

export default router