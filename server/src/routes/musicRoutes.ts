import express from "express";
import { searchMusicController } from "../controllers/musicController";
const router = express.Router();

router.get("/search/:query", searchMusicController);

export default router;
