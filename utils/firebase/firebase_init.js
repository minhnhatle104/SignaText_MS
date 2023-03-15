import admin from 'firebase-admin'
import serviceAccount from './service_account_key.js'

// Khởi tạo ứng dụng Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: '<YOUR_DATABASE_URL>',
  storageBucket: 'signatext.appspot.com',
})

// const bucket = admin.storage().bucket()

// module.exports = {
//   bucket
// }

export default admin
