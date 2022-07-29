import express from "express";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import path from "path";

/* import all callback functions */
import faucetCallBack from "./api/Faucet";
import hitconNFTSenderCallBack from "./api/HitconNFTSender";
import loginCallback from "./api/Login";
import pingCallback from "./api/Ping";

import config from "./config";

const router = express.Router({ caseSensitive: true });

const FileStore = sessionFileStore(expressSession);

router.use(expressSession({
    secret: config.sessionSecret,
    store: new FileStore({
        path: process.env.NODE_ENV === "development" ? "/tmp/hitcon_wargame_sessions" : path.resolve(__dirname, "../sessions")
    }),
    saveUninitialized: false, // don't store empty session if session expired
    resave: false,
    unset: 'destroy',
    rolling: true, // reset session cookie each ping. (See 'src/api/Ping.ts')
    cookie: {
        sameSite: true,
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12, // half a day
        path: "/"
    }, 
}));

router.post("/faucet", faucetCallBack);
router.post("/hitcon-nft-sender", hitconNFTSenderCallBack);
router.post("/login", loginCallback);
router.post("/ping", pingCallback);

export default router;
