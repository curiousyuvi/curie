import express from 'express';
import { createRoomController } from '../controllers/roomController';
const router = express.Router();

router.post("/create",createRoomController);

export default router;