import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import multer from 'multer'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
// import Middleware from './middlewares/auth.js'
import firebase from './utils/firebase/firebase_init.js'
import { GraphQLError } from 'graphql'

const app = express()

const server = new ApolloServer({
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
// app.use(Middleware.decodeToken)
app.use(cors())

// app.use(function (req, res) {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint not found!',
//     result: {},
//   })
// })

// app.use(function (err, req, res) {
//   console.log(err)
//   if (err instanceof multer.MulterError) {
//     res.status(400).json({
//       success: false,
//       message: err.message || err.code,
//       result: {},
//     })
//   } else {
//     res.status(500).json({
//       success: false,
//       message: 'Internal Server Error',
//       result: {},
//     })
//   }
// })

server.applyMiddleware({ app })
const PORT = process.env.app_port || 3000
app.listen(PORT, function () {
  console.log(`SignatureRoute API is listening at http://localhost:${PORT}`)
})
