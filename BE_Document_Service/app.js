import * as dotenv from 'dotenv';
import documentRoute from "./routes/document.route.js";
dotenv.config();
import {dirname} from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))

import express from 'express';
import morgan from 'morgan';
import asyncError from 'express-async-errors';
import cors from 'cors'
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerConfigOptions} from './utils/swagger.js';
import path from "path";
import {fileURLToPath} from "url";
import Middleware from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use(Middleware.decodeToken);

const specs = swaggerJsDoc(swaggerConfigOptions);
app.use(
    "/api-docs", swaggerUI.serve, swaggerUI.setup(specs)
);
// ----------------------- set static path --------------
app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.use('/api/document', documentRoute );

app.get('/err', function (req, res) {
    throw new Error('Error!');
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

app.use(function (req, res) {
    res.status(404).json({
        error: 'Endpoint not found!'
    });
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({
        error: 'Something wrong!'
    });
});

const PORT = process.env.app_port || 5050;
app.listen(PORT, function () {
    console.log(`Document API is listening at http://localhost:${PORT}`);
});

