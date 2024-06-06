import { Router } from 'express';
import { userRegister, userlogin, createUser } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { authorizeRole } from '../middleware/authorizeRole';

const router = Router();

router.post('/register', userRegister);
router.post('/login', userlogin);
router.post('/create', authenticateJWT, authorizeRole(['admin']), createUser);

export default router;
