import express from "express";
import { searchMusicController, currentlyPlayingController, switchPlayerController, playMusicController, pauseMusicController, previousMusicController, nextMusicController, addToQueueController, getDevicesMusicController, getCurrentPlaybackStateController } from "../controllers/musicController";
const router = express.Router();

router.get("/search/:token", searchMusicController);

router.get("/playing/:token", currentlyPlayingController);

router.put("/switch_player/:token", switchPlayerController);

router.get("/devices/:token", getDevicesMusicController)

router.get("/current_playback_state/:token", getCurrentPlaybackStateController)

router.put('/play/:token', playMusicController)

router.put('/pause/:token', pauseMusicController)

router.post('/previous/:token', previousMusicController)

router.post('/next/:token', nextMusicController)

router.post('/add_to_queue/:token', addToQueueController)






export default router;
