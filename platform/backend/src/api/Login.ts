import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import config from "../config";

declare module "express-session" {
    export interface SessionData {
        type: string
    }
}

const { BadRequest } = createError;

const loginCallback = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        if (req.body.token === undefined) {
            req.session.type = "anonym";
            return res.redirect(config.reactBaseURL);
        }
        const { token, submit } = req.body;
        const secret = config.jwtSecret;
        const decoded = jwt.verify(token, secret, {
            issuer: "https://hitcon.org",
        });
        if (typeof decoded !== "string") {
            if (decoded.scope === "wargame wargame_premium") {
                req.session.type = "token";
                return res.redirect(config.reactBaseURL + "/home");
            } else {
                return res.redirect(config.reactBaseURL);
            }
        } else {
            return res.redirect(config.reactBaseURL);
        }
    } catch (err) {
        if (err instanceof Error && (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError" ||
            err.name === "NotBeforeError")) {
            return res.redirect(config.reactBaseURL);
        } else {
            return res.status(500);
        }
    }
});

export default loginCallback;
