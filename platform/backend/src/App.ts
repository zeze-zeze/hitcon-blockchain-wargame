import express, { Express, Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from "compression";
import helmet from "helmet";
/* development dependencies */
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
/* import routes */
import router from './Routes';

const app: Express = express();

/* Setup express */
if (process.env.NODE_ENV === "development") {
    /* Setup CORS for the development environment */

    const corsOption: CorsOptions = {
        origin: "https://localhost:3000",
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true
    };
    /* Enable Pre-flight CORS */
    const corsMidware = cors(corsOption);
    app.use(corsMidware);
    app.options("*", corsMidware);

    /* Load Morgan */
    app.use(morgan("combined"));
}

app.use(compression());
app.use(helmet());
app.use(bodyParser.json({ limit: "200kb" }));
app.use(bodyParser.urlencoded({ limit: "200kb", extended: true }));
app.use(bodyParser.raw());
app.use('/', express.static(path.resolve(__dirname, '../client')))
app.use('/api', router);

export default app;
