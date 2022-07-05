import express from "express";
import { searchMusicController, switchOnPlayerController } from "../controllers/musicController";
const router = express.Router();

router.get("/search/:query", searchMusicController);

router.get("/switch_on_player/:token", switchOnPlayerController);


export default router;
