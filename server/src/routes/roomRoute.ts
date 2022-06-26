import express from 'express';
import { createRoomController, deleteRoomController, getRoomController, joinUserController, updateRoomController } from '../controllers/roomController';
const router = express.Router();

router.get('/:rid', getRoomController);

router.get('/join_user/:rid', joinUserController)


router.get('/delete/:rid', deleteRoomController);

router.post('/update/:rid', updateRoomController);

router.post('/create', createRoomController);

export default router;