import fs from "fs";
import https, {Server} from "https";
import createError from "http-errors";
import { exit } from "process";

import config from "./config";
import app from "./App";

/* Sanity Check */
if (!config.MainnetRPC) {
    console.error('Please provide mainnet RPC address');
    exit(1);
}
if (!config.PublicKey || !config.PrivateKey) {
    console.error('Please provide your test address key pair');
    exit(1);
}
if (!config.jwtSecret) {
    console.error('Please provide your JWT secret key');
    exit(1);
}
if (!config.sessionSecret) {
    console.error('Please provide your session secret key');
    exit(1);
}

app.use((err: any, req: any, res: any, next: any) => {
    if (!createError.isHttpError(err)) {
        console.log(err);
        next(err);
    }
    return res.status(err.status || 500).json({
        ok: false,
        message: err.expose && err.message ? err.message : "Unknown error",
    });
});

if (process.env.NODE_ENV === "development") {
    /* ssl certificates */
    const server: Server = https.createServer({
        key: fs.readFileSync(config.sslPrivKey),
        cert: fs.readFileSync(config.sslCert)
    }, app);

    server.listen(config.port, () => {
        console.log(`[express]: Running at port ${config.port}`);
    });
} else {
    app.listen(config.port, () => {
        console.log(`[express]: Running at port ${config.port}`);
    });
}

