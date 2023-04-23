import { ApolloError } from 'apollo-server-express'
import firebase from './utils/firebase/firebase_init.js'

const resolvers = {
  Query: {
    signatureList: async (parent, args, contextValue, info) => {
      try {
        const directory = `user/${contextValue.userId}/signatures/`
        console.log('directory', directory)
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
}
export default resolvers
