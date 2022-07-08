import { Request, Response } from 'express';
import Joi from 'joi';

type RegisterResponse = {
    status: string,
} | {
    error: string,
};

const registerSchema = Joi.object({
    username: Joi.string()
        .required()
        .min(3)
        .max(64)
        .alphanum()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username must not be empty',
            'string.required': 'Username required',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must be less than or equal to 64 characters long',
            'string.alphanum': 'Username must only contain alphanumeric characters'
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(128)
        /* https://stackoverflow.com/questions/1247762/regex-for-all-printable-characters#answer-31740504 */        
        .pattern(/^[ -~]+$/, { name: 'printable' })
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password must not be empty',
            'string.required': 'Password required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be less than or equal to 128 characters long',
            'string.pattern.name': 'Password must only contain printable characters',
        }),
});

const registerCallback = async (req: Request, res: Response) => {
    let registerReq: any = req.body;
    let registerRes: RegisterResponse;
    
    try {
        const { username, password } = await registerSchema.validateAsync(registerReq);
        /* Generate password hash */
        console.log(username, password)
        

    } catch (error) {
        /*if (error instanceof ValidationError) {
            
            registerRes = { error: error.details[0].message };
        } else {
            registerRes = { error: ErrorMessages.SERVER_ERROR };
        }
        res.send(registerRes);
        */
    }
};

export default registerCallback;
