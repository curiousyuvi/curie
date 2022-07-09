import express from 'express';
import { loginController, tokenController, refreshController, clearController } from '../controllers/authController';
const router = express.Router();

router.get('/login', loginController);

router.get('/token', tokenController);

router.get('/refresh', refreshController);

router.get('/clear', clearController);



export default router;