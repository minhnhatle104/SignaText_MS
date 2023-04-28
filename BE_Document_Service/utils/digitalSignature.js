
import fs from "fs"
import {SignPdf, plainAddPlaceholder} from "node-signpdf"
import forge from "node-forge"

export default {
    async testSignFile(name, email){
        try {
            // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'spki',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs8',
            //         format: 'pem'
            //     }
            // });
            const keys = forge.pki.rsa.generateKeyPair(2048);
            const cert = forge.pki.createCertificate();

// Thông tin chứng chỉ
            const attrs = [{
                name: 'commonName',
                value: name
            }, {
                name: 'emailAddress',
                value: email
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
            cert.sign(keys.privateKey,forge.md.sha256.create());
            fs.writeFileSync('certificate.pem', forge.pki.certificateToPem(cert));
            const cert1 = forge.pki.certificateFromPem(forge.pki.certificateToPem(cert));

// Tạo một bộ P12 từ khóa riêng và chứng chỉ
            const password = ''; // Mật khẩu để bảo vệ file P12
            const p12Asn1 = forge.pkcs12.toPkcs12Asn1(keys.privateKey, [cert1], password);
            const p12Der = forge.asn1.toDer(p12Asn1).getBytes();

            // const cert1 = forge.pki.certificateFromPem();
            let pdfBuffer = fs.readFileSync('test.pdf')
            const signer = new SignPdf()
            pdfBuffer = plainAddPlaceholder({
                pdfBuffer: pdfBuffer,
                reason: 'second',
                location: 'test location',
                signatureLength: 2046,
            });
            pdfBuffer = signer.sign(pdfBuffer, Buffer.from(p12Der, 'binary'))

            fs.writeFileSync("test.pdf", pdfBuffer);
        } catch (err) {
            console.log(err)
        }
    },
     digitalSignaturePdfFile(privateKey, certificate, pdfBytes) {

// Tạo một bộ P12 từ khóa riêng và chứng chỉ
        const p12Asn1 = forge.pkcs12.toPkcs12Asn1(privateKey, [certificate], '');
        const p12Der = forge.asn1.toDer(p12Asn1).getBytes();

        // const cert1 = forge.pki.certificateFromPem();
        // let pdfBuffer = fs.readFileSync('test.pdf')
        const signer = new SignPdf()
        let pdfBuffer = plainAddPlaceholder({
            pdfBuffer: pdfBytes,
            reason: 'We need your signature to validate the legality of the PDF file and ensure the authenticity of each signatory',
            location: 'Viet Nam',
            signatureLength: 2046,
        });
        pdfBuffer = signer.sign(pdfBuffer, Buffer.from(p12Der, 'binary'))
        return pdfBuffer
    },

    async verifyDigitalSignature(publicKey, pdfBytes) {

    }
}