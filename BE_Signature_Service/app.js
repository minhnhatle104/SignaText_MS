import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import firebase from './utils/firebase/firebase_init.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'

const app = express()

const server = new ApolloServer({
  uploads: false,
  typeDefs,
  resolvers: resolvers,
  playground: true,
  context: async ({ req }) => {
    const token = req.headers.authorization

    try {
      if (!token) {
        throw new GraphQLError('Unauthorized', {
          extensions: {
            code: 'UNAUTHORIZED',
            http: { status: 401 },
          },
        })
      }

      const decodeValue = await firebase.auth().verifyIdToken(token)

      if (decodeValue) {
        return { token, userId: decodeValue.user_id }
      }
      throw new GraphQLError('Unauthorized', {
        extensions: {
          code: 'UNAUTHORIZED',
          http: { status: 401 },
        },
      })
    } catch (error) {
      console.log('error', error)
      return {
        status: 500,
        message: 'Internal server error',
      }
    }
  },
})

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 1 }))

server.applyMiddleware({ app })
const PORT = process.env.app_port || 3000
app.listen(PORT, function () {
  console.log(`SignatureRoute API is listening at http://localhost:${PORT}`)
})
