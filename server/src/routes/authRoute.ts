import express from 'express';
import { loginController, tokenController } from '../controllers/authController';
const router = express.Router();

router.get('/login', loginController);

router.get('/token', tokenController);

export default router;