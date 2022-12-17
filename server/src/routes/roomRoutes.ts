import express from 'express';
import { getRoomController, deleteRoomController, createRoomController, getOnlineUsersController } from '../controllers/roomControllers';
const router = express.Router();

router.get('/:rid', getRoomController);

router.delete('/:rid', deleteRoomController);

router.post('/', createRoomController);

router.get('/:rid/online', getOnlineUsersController);


export default router;