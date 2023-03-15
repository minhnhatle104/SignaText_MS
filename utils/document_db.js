//lets require/import the mongodb native drivers.
// import mongodb from 'mongodb'
// var MongoClient = mongodb.MongoClient;
// var url = "mongodb+srv://dacnpmgroup07:yDRXAJ5YlP2x5a6m@cluster0.rzo5ngl.mongodb.net/?retryWrites=true&w=majority"
// const mongo = await MongoClient.connect(url);
// export default mongo.db("SignaText_Document")
import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.js'

// Khởi tạo ứng dụng Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: '<YOUR_DATABASE_URL>',
    storageBucket: 'signatext.appspot.com'
});

const bucket = admin.storage().bucket()

// module.exports = {
//   bucket
// }

export default {
    bucket
}