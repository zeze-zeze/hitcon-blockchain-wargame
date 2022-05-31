import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import app from './App';

import registerCallback from './api/Register';

const router = express.Router({ caseSensitive: true });

router.post('/register', registerCallback);

export default router;
