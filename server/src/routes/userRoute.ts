import express from 'express';
import { createUserController, deleteUserController, getUserController, updateUserController } from '../controllers/userController';
const router = express.Router();

router.get('/:uid',getUserController);

router.delete('/delete/:uid',deleteUserController);

router.post('/update/:uid',updateUserController)

router.post('/create', createUserController);

export default router;