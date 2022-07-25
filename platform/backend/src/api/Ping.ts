import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import asyncHandler from "express-async-handler";

declare module "express-session" {
    export interface SessionData {
        type: string
    }
}

const { BadRequest } = createError;

const expiryCallBack = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        console.log(req.session);
        
        if (!req.session.type) {
            return res.json({
                ok: true,
                expired: true
            });
        } else {
            req.session.touch();
            return res.json({
                ok: true,
                expired: false
            });
        }
        
        
    } catch (err) {
        if (err instanceof Error) {
            return next(new BadRequest("Invalid Token"));
        } else {
            return res.status(500);
        }
    }
});

export default expiryCallBack;
