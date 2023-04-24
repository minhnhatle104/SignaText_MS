import * as dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin'


const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_x509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  }
  ),
  storageBucket: "signatext-v02.appspot.com"
});

console.log(process.env.PRIVATE_KEY)
console.log("replace: ",process.env.PRIVATE_KEY.replace(/\\n/g, '\n'))
console.log(typeof process.env.PRIVATE_KEY)

export default serviceAccount