import express from "express";
import {
  getMessagesController,
  postMessageController,
} from "../controllers/messageControllers";

const router = express.Router();

router.get("/:rid", getMessagesController);

router.post("/", postMessageController);

export default router;
