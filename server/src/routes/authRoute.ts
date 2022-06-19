import express from 'express';
import { loginController, refreshController, tokenController } from '../controllers/authController';
const router = express.Router();

router.get('/login', loginController);

router.get('/token', tokenController);

router.get('/refresh', refreshController);


export default router;