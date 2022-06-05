import dotenv from "dotenv";
import path from "path";
import app from "./App";
import router from "./Routes";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import createError from "http-errors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port: string = process.env.PORT ?? "8080";

if (process.env.NODE_ENV === "development") {
  /* Setup CORS for the development environment */

  const corsOption: CorsOptions = {
    origin: "http://localhost:3000",
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

app.use("/api", router);

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

app.listen(port, () => {
  console.log(`[express]: Running at port ${port}`);
});
