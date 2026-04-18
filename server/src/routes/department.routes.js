import { Router } from 'express';
import * as DepartmentController from '../controllers/department.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';

const router = Router();

// GET /, POST /

export default router;
