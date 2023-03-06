import express from "express";
import {
  getLastTrackController,
  searchMusicController,
  updateLastTrackController,
} from "../controllers/musicControllers";
const router = express.Router();

router.get("/search/:query", searchMusicController);

router.get("/lasttrack/:rid", getLastTrackController);

router.put("/lasttrack/:rid", updateLastTrackController);

export default router;
