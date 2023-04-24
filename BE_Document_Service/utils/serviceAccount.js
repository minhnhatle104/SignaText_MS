import * as dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin'

const {privateKey} = JSON.parse(process.env.PRIVATE_KEY)

const serviceAccount = admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key":  privateKey,
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
export default serviceAccount