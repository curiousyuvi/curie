import { Request, Response } from "express";
import searchMusic from "../services/searchMusic";

const searchMusicController = async (req: Request, res: Response) => {
  const tracks = await searchMusic(req.params.query);
  if (tracks) {
    res.status(200).json({
      tracks,
    });
  } else {
    res.status(400).json({ message: "failure" });
  }
};

export { searchMusicController };
