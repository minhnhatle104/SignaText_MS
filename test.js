import express from 'express';
import multer from 'multer';
import firebase from './utils/firebase/config.js'
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

const upload = multer({
  storage: multer.memoryStorage()
})

app.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
    return res.status(400).send("Error: No files found")
  }

  const directory = 'user/KN3MvooRQWZHYznKnEsASTnePwv2/signatures/';
  const blob = firebase.bucket.file(directory + req.file.originalname)

  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  blobWriter.on('error', (err) => {
    console.log(err)
  })

  blobWriter.on('finish', () => {
    res.status(200).send("File uploaded.")
  })

  blobWriter.end(req.file.buffer)
})

app.delete('/delete',  (req, res) => {

  const directory = 'user/KN3MvooRQWZHYznKnEsASTnePwv2/signatures/';
  const fileName = 'duy.jpeg';

// Xóa file
  firebase.bucket.file(directory + fileName).delete().then(() => {
    res.status(200).send('Xóa file thành công!');
  }).catch((error) => {
    res.status(400).send('Xóa file thất bại: '+ error);
  });
})

app.get('/files', (req, res) => {
  const directory = 'user/KN3MvooRQWZHYznKnEsASTnePwv2/signatures/';
  var urlG = ''
// Lấy danh sách các file trong thư mục
  firebase.bucket.getFiles({
    prefix: directory,
    delimiter: '/'
  }).then((data) => {
    const files = data[0];

    // Lặp qua từng file và lấy tên và URL của chúng
    files.forEach((file) => {
      const filePath = file.name;
      const fileName = filePath.replace(`${directory}`, '');
      if (!fileName) {
        return;
      }
      // Lấy đường dẫn có thể truy cập của file
      file.getSignedUrl({
        action: 'read',
        expires: '03-17-2023' // Thời gian sống của đường dẫn (định dạng MM-DD-YYYY)
      }).then((signedUrls) => {
        const url = signedUrls[0];
        console.log(`Tên file: ${fileName}, Đường dẫn có thể truy cập: ${url}`);
      }).catch((error) => {
        console.log(`Lỗi khi lấy đường dẫn: ${error}`);
      })
    });
    res.status(200).send('success')
  }).catch((error) => {
    console.log(`Lỗi khi lấy danh sách file: ${error}`);
  });
})

app.listen(3001, () => {
  console.log('🚀Server listening on port 3001')
})