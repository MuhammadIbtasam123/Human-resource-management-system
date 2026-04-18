import { Router } from 'express';
import authRoutes from './auth.routes.js';
import employeeRoutes from './employee.routes.js';
import departmentRoutes from './department.routes.js';
import orgRoutes from './organization.routes.js';

const router = Router();

// router.use('/auth', authRoutes);
// router.use('/employees', employeeRoutes);
// router.use('/departments', departmentRoutes);
// router.use('/organizations', orgRoutes);

export default router;
