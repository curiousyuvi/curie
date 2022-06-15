import express from 'express';
import { createUserController } from '../controllers/userController';
import {getUserController} from '../controllers/userController';
const router = express.Router();

router.get('/get',getUserController);

router.post('/create', createUserController);

export default router;