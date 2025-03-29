import { Router } from 'express';
import userRoutes from './UserRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;