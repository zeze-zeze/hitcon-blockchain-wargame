import { Request, Response, NextFunction } from "express";
import Joi, { ValidationError } from 'joi';
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import Web3 from 'web3';

const { BadRequest, UnprocessableEntity } = createError;

const problem_num = Number(process.env.PROBLEM_NUM);
const SolveJOISchema = Joi.object({
    index: Joi.number().min(1).max(problem_num),
});

const solveCallBack = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { index } = await SolveJOISchema.validateAsync(req.body);
    } catch (err) {
        res.status(500);
    }
});

export default solveCallBack;
