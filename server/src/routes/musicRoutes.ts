import express from "express";
import { addToQueueController, currentlyPlayingController, nextMusicController, pauseMusicController, playMusicController, previousMusicController, searchMusicController, switchOnPlayerController } from "../controllers/musicController";
const router = express.Router();

router.get("/search/:query", searchMusicController);

router.get("/playing/:token", currentlyPlayingController);

router.put("/switch_player/:token", switchOnPlayerController);

router.put('/play/:token', playMusicController)

router.put('/pause/:token', pauseMusicController)

router.post('/previous/:token', previousMusicController)

router.post('/next/:token', nextMusicController)

router.post('/add_to_queue/:token', addToQueueController)






export default router;
