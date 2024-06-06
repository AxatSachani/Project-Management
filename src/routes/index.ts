import { Router } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import taskRoutes from './taskRoutes';

const router = Router();

router.use('/user', authRoutes);
router.use('/projects', authenticateJWT, projectRoutes);
router.use('/tasks', authenticateJWT, taskRoutes);

export default router;
