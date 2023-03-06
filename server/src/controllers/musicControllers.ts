import { Request, Response } from "express";
import searchMusic from "../services/searchMusic";
import getRoom from "../services/getRoom";
import updateRoom from "../services/updateRoom";

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

const getLastTrackController = (req: Request, res: Response) => {
  getRoom(req.params.rid, (err, docs) => {
    if (!err) {
      if (docs)
        res.status(200).json({
          id: docs.last_track_id,
          thumbnail: docs.last_track_thumbnail,
          name: docs.last_track_name,
          channel: docs.last_track_channel,
          playing: docs.last_track_playing,
          progress: docs.last_track_progress,
          timestamp: docs.last_track_timestamp,
        });
      else res.status(404).json({ message: "room not found" });
    } else {
      res.status(400).json({ message: "failure" });
    }
  });
};

const updateLastTrackController = (req: Request, res: Response) => {
  updateRoom(req.params.rid, req.body, (err, docs) => {
    if (!err)
      if (docs) res.status(200).json({ massage: "success" });
      else res.status(404).json({ message: "room not found" });
    else res.status(400).json({ message: "failure" });
  });
};

export {
  searchMusicController,
  getLastTrackController,
  updateLastTrackController,
};
