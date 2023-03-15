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


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

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

const port = process.env.PORT || 6060
app.listen(port, function () {
    console.log(`Document API is listening at http://localhost:${PORT}`);
});

