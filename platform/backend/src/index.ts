import dotenv from "dotenv";
import fs from "fs";
import https, {Server} from "https";
import path from "path";
import app from "./App";
import createError from "http-errors";
import { exit } from "process";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (process.env.JWT_SECRET === undefined) {
  console.error("Please provide your JWT secret key");
  exit(1);
}
const port: string = process.env.PORT ?? "8080";

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

/* ssl certificates */
const server: Server = https.createServer({
    key: fs.readFileSync(path.resolve(__dirname, "../ssl/sample.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "../ssl/sample.crt"))
}, app);

server.listen(port, () => {
    console.log(`[express]: Running at port ${port}`);
});
