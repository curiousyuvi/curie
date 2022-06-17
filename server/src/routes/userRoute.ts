import express from 'express';
import { createUserController, deleteUserController, getUIDController, getUserController, searchUserController, updateUserController, userExistsController } from '../controllers/userController';
const router = express.Router();

router.get('/:uid', getUserController);

router.get('/uid/:token', getUIDController)

router.get('/search/:username', searchUserController)

router.delete('/delete/:uid', deleteUserController);

router.post('/update/:uid', updateUserController);

router.post('/create', createUserController);

router.get('/exists/:uid', userExistsController)

export default router;