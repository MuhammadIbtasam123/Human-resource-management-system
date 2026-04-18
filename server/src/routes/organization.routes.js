import { Router } from 'express';
import * as OrgController from '../controllers/organization.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requirePermission } from '../middleware/rbac.js';

const router = Router();

// GET /settings, PUT /settings

export default router;
