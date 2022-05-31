import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();

app.use('/', express.static(path.resolve(__dirname, '../client')))

app.get('/', (req: Request, res: Response) => {
    res.send('Testing');
});

export default app;
