import express from 'express';
import { getRoomController, deleteRoomController, createRoomController } from '../controllers/roomControllers';
const router = express.Router();

router.get('/:rid', getRoomController);

router.delete('/:rid', deleteRoomController);

router.post('/', createRoomController);

export default router;