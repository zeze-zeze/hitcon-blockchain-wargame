import express from "express";

//import registerCallback from "./api/Register";
import faucetCallBack from "./api/Faucet";
import solveCallBack from "./api/Solve";
import hitconNFTSenderCallBack from "./api/HitconNFTSender";

const router = express.Router({ caseSensitive: true });

//router.post("/register", registerCallback);
router.post("/solve", solveCallBack);
router.post("/faucet", faucetCallBack);
router.post("/hitcon-nft-sender", hitconNFTSenderCallBack);

export default router;
