import express, { Express, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import router from './Routes';

const app: Express = express();

if (process.env.NODE_ENV === 'development') {

    /* Setup CORS for the development environment */

    const corsOption: CorsOptions = {
        origin: 'http://localhost:3000',
    };
    /* Enable Pre-flight CORS */
    const corsMidware = cors(corsOption);
    app.use(corsMidware);
    app.options('*', corsMidware);

    /* Load Morgan */
    app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../client')))
app.use('/api', router);

export default app;
