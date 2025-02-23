import express from 'express';

import { register, login, getProfile } from '../controllers/Auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);

export default router;