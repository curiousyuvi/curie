import express from 'express';
import { createRoomController, deleteRoomController, getRoomController, updateRoomController} from '../controllers/roomController';
const router = express.Router();

router.get('/:rid',getRoomController);

router.get('/delete/:rid',deleteRoomController);

router.post('/update/:rid',updateRoomController);

router.post('/create',createRoomController);

export default router;