import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import config from "../config";

declare module "express-session" {
    export interface SessionData {
        type: string;
        token?: string;
    }
}

const { BadRequest } = createError;

/* Login from landing page. User need to enter his/her token manually */
const authCallback = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        if (req.body.type === undefined) {
            return next(new BadRequest("Invalid login type"));
        }
        if (req.body.type === "token" && !req.body.token) {
            return next(new BadRequest("Missing token"));
        }
        const { type, token } = req.body;
        if (type === "anonymous") {
            req.session.type = type;
            return res.status(200).json({
                ok: true,
            });
        } else if (type === "token") {
            const secret = config.jwtSecret;
            const decoded = jwt.verify(token, secret, {
                issuer: "https://hitcon.org",
            });
            if (typeof decoded !== "string") {
                if (decoded.scope === "wargame wargame_premium") {
                    req.session.type = type;
                    req.session.token = token;
                    return res.status(200).json({
                        ok: true,
                    });
                } else {
                    return next(new BadRequest("Permission denied"));
                }
            } else {
                return next(new BadRequest("Invalid token"));
            }
        } else {
            return next(new BadRequest("Invalid login type"));
        }
    } catch (err) {
        if (err instanceof Error && (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError" ||
            err.name === "NotBeforeError")) {
            return next(new BadRequest("Invalid token"));
        } else {
            return res.status(500);
        }
    }
});

export default authCallback;
