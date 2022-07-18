import express from 'express';
import { getUserController, getUIDController, joinRoomController, removeRoomController, searchUserController, deleteUserController, updateUserController, createUserController, userExistsController, getPremiumStatusController } from '../controllers/userController';
const router = express.Router();

router.get('/:uid', getUserController);

router.get('/uid/:token', getUIDController)

router.get('/premium_status/:token', getPremiumStatusController)

router.get('/join_room/:uid', joinRoomController)

router.get('/remove_room/:uid', removeRoomController)

router.get('/search/:username', searchUserController)

router.delete('/delete/:uid', deleteUserController);

router.post('/update/:uid', updateUserController);

router.post('/create', createUserController);

router.get('/exists/:uid', userExistsController)

export default router;