import dotenv from 'dotenv';
import path from 'path';
import app from './App';
import router from './Routes';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port: string = process.env.PORT ?? '8080';

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

app.use('/api', router);


app.listen(port, () => {
    console.log(`[express]: Running at port ${port}`);
});
