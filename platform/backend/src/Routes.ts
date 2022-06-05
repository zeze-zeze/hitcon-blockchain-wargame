import express, { Request, Response } from "express";
import dotenv from "dotenv";
import app from "./App";

import registerCallback from "./api/Register";
import faucetCallBack from "./api/Faucet";

const router = express.Router({ caseSensitive: true });

router.post("/register", registerCallback);

router.post("/faucet", faucetCallBack);

export default router;
