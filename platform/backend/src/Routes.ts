import express from "express";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";

//import registerCallback from "./api/Register";
import faucetCallBack from "./api/Faucet";
import solveCallBack from "./api/Solve";
import hitconNFTSenderCallBack from "./api/HitconNFTSender";
import loginCallback from "./api/Login";
import path from "path";

const router = express.Router({ caseSensitive: true });

const FileStore = sessionFileStore(expressSession);

router.use(expressSession({
    secret: process.env.COOKIE_SECRET ?? "secret",
    store: new FileStore({
        path: path.resolve(__dirname, "../sessions")
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        sameSite: true,
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        path: "/"
    },
}));
router.post("/solve", solveCallBack);
router.post("/faucet", faucetCallBack);
router.post("/hitcon-nft-sender", hitconNFTSenderCallBack);
router.post("/login", loginCallback);

export default router;
