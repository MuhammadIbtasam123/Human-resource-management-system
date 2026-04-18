import { Router } from 'express';
import * as EmployeeController from '../controllers/employee.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';

const router = Router();

// GET /, POST /, GET /:id, PUT /:id, DELETE /:id

export default router;
