import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// POST /register, POST /login, GET /me

export default router;
