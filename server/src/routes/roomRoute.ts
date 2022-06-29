import express from 'express';
import { addAdminController, createRoomController, deleteRoomController, getRoomController, joinUserController, removeAdminController, removeUserController, roomExistsController, sendMessageController, updateRoomController } from '../controllers/roomController';
const router = express.Router();

router.get('/:rid', getRoomController);

router.get('/join_user/:rid', joinUserController)

router.get('/remove_user/:rid', removeUserController)

router.get('/add_admin/:rid', addAdminController)

router.get('/remove_admin/:rid', removeAdminController)

router.get('/delete/:rid', deleteRoomController);

router.post('/update/:rid', updateRoomController);

router.post('/send_message/:rid', sendMessageController);

router.post('/create', createRoomController);

router.get('/exists/:rid', roomExistsController);




export default router;