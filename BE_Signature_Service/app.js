import * as dotenv from 'dotenv';
dotenv.config();
import signatureRoute from "./routes/signature.route.js";
import express from 'express';
import morgan from 'morgan';
import asyncError from 'express-async-errors';
import cors from 'cors'
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerConfigOptions} from './utils/swagger.js';
import Middleware from "./middlewares/auth.js";
import multer from "multer";
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use(Middleware.decodeToken);

const specs = swaggerJsDoc(swaggerConfigOptions);
app.use(
    "/api-docs", swaggerUI.serve, swaggerUI.setup(specs)
);

app.use('/api/signature', signatureRoute );


app.get('/err', function (req, res) {
    throw new Error('Error!');
});

app.use(function (req, res) {
    res.status(404).json({
    success: false,
    message: 'Endpoint not found!',
    result: {}
    })
});

app.use(function (err, req, res, next) {
    console.log(err);
    if (err instanceof multer.MulterError) {
        res.status(400).json({
            success: false,
            message: err.message || err.code,
            result: {}
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            result: {}
        });
    }
});

const PORT = process.env.app_port || 3000;
app.listen(PORT, function () {
    console.log(`SignatureRoute API is listening at http://localhost:${PORT}`);
});

