// import * as dotenv from 'dotenv';
// dotenv.config();
// import authenticationRoute from "./routes/authentication.route.js";
// import express from 'express';
// import morgan from 'morgan';
// import asyncError from 'express-async-errors';
// import cors from 'cors'
// import swaggerUI from 'swagger-ui-express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import {swaggerConfigOptions} from './utils/swagger.js';
// import Middleware from "./middlewares/auth.js";
//
// const app = express();
//
// app.use(express.json());
// app.use(morgan('dev'));
// app.use(cors())
// app.use(Middleware.decodeToken);
//
//
// const specs = swaggerJsDoc(swaggerConfigOptions);
// app.use(
//     "/api-docs", swaggerUI.serve, swaggerUI.setup(specs)
// );
//
// app.use('/api/authentication', authenticationRoute );
//
//
// app.get('/err', function (req, res) {
//     throw new Error('Error!');
// });
//
// app.use(function (req, res) {
//     res.status(404).json({
//         error: 'Endpoint not found!'
//     });
// });
//
// app.use(function (err, req, res, next) {
//     console.log(err.stack);
//     res.status(500).json({
//         error: 'Something wrong!'
//     });
// });
//
//
//
// const PORT = process.env.app_port || 7000;
// app.listen(PORT, function () {
//     console.log(`Authentication API is listening at http://localhost:${PORT}`);
// });
//

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import * as dotenv from 'dotenv';
import authenticationModel from "./models/authentication.model.js";
import crypto from "crypto";

dotenv.config();

const PROTO_PATH = './user.proto';
const port = process.env.app_port || 7000;

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

let packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const handleAddUser = async (newUser) => {
    if (newUser === "") {
        return {
            message: 'Invalid User\'s Information.',
            status: false,
        };
    }

    const isExisted = await authenticationModel.isEmailExist(newUser.email)
    if (isExisted) {
        return {
            message: "User already existed!",
            status: false,
        };
    } else {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });

        newUser.publicKey = publicKey;
        newUser.privateKey = privateKey;
        await authenticationModel.addNewAccount(newUser);

        return {
            message: 'Add successfully!',
            status: true,
        };
    }
}

server.addService(userProto.UserService.service, {
    addUser: (call, callback) => {
        const user = call.request || {};
        console.log(user);
        handleAddUser(user)
          .then((res) => {
              callback(null, res);
          })
          .catch((err) => {
              console.log(err);
          })
    },
});

server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log(`Server running at 0.0.0.0:${port}`);
        server.start();
    }
);
