import express, { Request, Response } from "express";

//import registerCallback from "./api/Register";
import faucetCallBack from "./api/Faucet";
import solveCallBack from "./api/Solve";

const router = express.Router({ caseSensitive: true });

//router.post("/register", registerCallback);
router.post("/solve", solveCallBack);
router.post("/faucet", faucetCallBack);

export default router;
