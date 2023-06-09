import { ApolloError } from 'apollo-server-express'
import firebase from './utils/firebase/firebase_init.js'
import { GraphQLError } from 'graphql'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js'

const resolvers = {
  UploadFile: GraphQLUpload,
  Query: {
    signatureList: async (parent, args, contextValue, info) => {
      try {
        const directory = `user/${contextValue.userId}/signatures/`
        const files = await firebase
          .storage()
          .bucket()
          .getFiles({
            prefix: directory,
            delimiter: '/',
          })
          .then((data) => {
            return data[0]
          })
          .catch((error) => {
            console.log(error)
            return []
          })

        const data = await Promise.all(
          files.map(async (file) => {
            const fileName = file.name.replace(`${directory}`, '')
            if (!fileName) {
              return
            }
            const [signedUrl] = await file.getSignedUrl({
              action: 'read',
              expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Thời gian sống của đường dẫn (định dạng MM-DD-YYYY)
            })
            return {
              file_name: fileName,
              file_url: signedUrl,
            }
          })
        )

        return {
          result: data.filter((sign) => !!sign),
        }
      } catch (error) {
        return new ApolloError('Internal Server Error')
      }
    },
  },
  Mutation: {
    addSignature: async (parent, args, contextValue, info) => {
      const { file } = args
      const awaitedFile = await file
      const { filename, createReadStream, mimetype } = awaitedFile

      try {
        if (!awaitedFile) {
          throw new GraphQLError('File is required', {
            extensions: {
              code: 'BAD REQUEST',
              http: { status: 400 },
            },
          })
        }

        const userFolderName = `user/${contextValue.userId}/signatures`
        const filePath = `${userFolderName}/${filename}`

        const blob = firebase.storage().bucket().file(filePath)
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: mimetype,
          },
        })

        blobStream.on('error', (err) => {
          console.error(err)
          throw new GraphQLError(
            'Unable to upload file, please try again later.',
            {
              extensions: {
                code: 'INTERNAL SERVER ERROR',
                http: { status: 500 },
              },
            }
          )
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
            })
            .catch((err) => {
              console.error(err)
              return {
                status: 500,
                message: 'Có lỗi xảy ra khi lấy signed URL',
              }
            })
        })

        const chunks = []
        for await (const data of createReadStream()) {
          chunks.push(data)
        }
        blobStream.end(Buffer.concat(chunks))

        return {
          status: 200,
          message: 'File uploaded successfully',
        }
      } catch (error) {
        console.error(error)
        return {
          status: 500,
          message: 'Unable to upload file, please try again later.',
        }
      }
    },
    deleteSignature: async (parent, args, contextValue, info) => {
      const { fileName } = args

      if (!fileName) {
        throw new GraphQLError('File name is required', {
          extensions: {
            code: 'BAD REQUEST',
            http: { status: 400 },
          },
        })
      }

      try {
        // Tìm kiếm file trong thư mục User
        const userFolderName = `user/${contextValue.userId}/signatures`
        const filePath = `${userFolderName}/${fileName}`
        const file = firebase.storage().bucket().file(filePath)

        // Kiểm tra xem file có tồn tại hay không
        const [exists] = await file.exists()

        if (!exists) {
          throw new GraphQLError('File not found', {
            extensions: {
              code: 'NOT FOUND',
              http: { status: 404 },
            },
          })
        }

        // Xóa file
        await file.delete()
        return {
          status: 200,
          message: 'File deleted successfully',
        }
      } catch (error) {
        return {
          status: error.status || 404,
          message: error.message,
        }
      }
    },
  },
}
export default resolvers
