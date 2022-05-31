import { Request, Response } from 'express';

const registerCallback = async (req: Request, res: Response) => {
    res.send({ 'cat': 'meow' });
};

export default registerCallback;
