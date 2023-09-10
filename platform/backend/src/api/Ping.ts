import { Request, Response, NextFunction } from "express";
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
        if (!req.session) {
            return next(new BadRequest("User unauthorized"));
        } else if (!req.session.type) {
            return res.json({
                ok: true,
                expired: true
            });
        } else {
            return res.json({
                ok: true,
                expired: false
            });
        }
        
        
    } catch (err) {
        return res.status(500);
    }
});

export default expiryCallBack;
