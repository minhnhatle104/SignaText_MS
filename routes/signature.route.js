import express from "express"
import firebase from "../utils/firebase/firebase_init.js";
import SignatureModel from "../models/signature.model.js";
import multer, {MulterError} from 'multer';

const router = express.Router()

const upload = multer({
  limits: {fileSize: 50 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new MulterError('Only image files are allowed!'), false);
    }
  },
});

router.get("/test", async (req, res) => {
  return res.status(200).json({
    message: "success"
  })
})

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded.',
        result: {}
      });
      return;
    }
    console.log(req.user, req.user.user_id)

    const userFolderName = `user/${req.user.user_id}/signatures`;
    const filePath = `${userFolderName}/${file.originalname}`;

    const blob = firebase.storage().bucket().file(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Unable to upload file, please try again later.',
        result: {}
      });
    });

    blobStream.on('finish', () => {
      blob.getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Thời gian hết hạn của URL (ở đây là 1 năm)
      }).then((signedUrls) => {
        console.log(`File uploaded successfully. Signed URL: ${signedUrls[0]}`);

        // Trả về thông tin của file vừa upload
        res.status(200).json({
          success: true,
          message: 'File uploaded successfully',
          result: {
            signature: {
              file_name: file.originalname,
              file_url: signedUrls[0],
            },
          }
        });
      }).catch((err) => {
        console.error(err);
        res.status(500).json({
          success: false,
          message: 'Có lỗi xảy ra khi lấy signed URL',
          result: {}
        });
      });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Unable to upload file, please try again later.',
      result: {}
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const directory = `user/${req.user.user_id}/signatures/`;
    const files = await firebase.storage().bucket().getFiles({
      prefix: directory,
      delimiter: '/'
    }).then((data) => {
      return data[0];
    }).catch((error) => {
      console.log(error);
      return []
    })

    const data = await Promise.all(files.map(async (file) => {
        const fileName = file.name.replace(`${directory}`, '');
        if (!fileName) {
          return;
        }
        const [signedUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7 // Thời gian sống của đường dẫn (định dạng MM-DD-YYYY)
        })
        return {
          file_name: fileName,
          file_url: signedUrl
        }
      })
    );
    res.status(200).json({
      success: true,
      message: 'Get signatures successfully',
      result: {
        signatures: data.filter(sign => !!sign)
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      result: {}
    });
  }
})

router.delete("/delete", async (req, res) => {
  const { file_name } = req.body;

  if (!file_name) {
    return res.status(400).json({
      success: false,
      message: 'Filename is required',
      result: {}
    });
  }

  try {
    // Tìm kiếm file trong thư mục User
    const userFolderName = `user/${req.user.user_id}/signatures`;
    const filePath = `${userFolderName}/${file_name}`;
    const file = firebase.storage().bucket().file(filePath);

    // Kiểm tra xem file có tồn tại hay không
    const [exists] = await file.exists();

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        result: {}
      });
    }

    // Xóa file
    await file.delete();
    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
      result: {}
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      result: {}
    });
  }
})

export default router