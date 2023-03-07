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
          last_track_id: docs.last_track_id,
          last_track_thumbnail: docs.last_track_thumbnail,
          last_track_name: docs.last_track_name,
          last_track_channel: docs.last_track_channel,
          last_track_playing: docs.last_track_playing,
          last_track_progress: docs.last_track_progress,
          last_track_timestamp: docs.last_track_timestamp,
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
    else {
      res.status(400).json({ message: "failure" });
      console.error(err);
    }
  });
};

export {
  searchMusicController,
  getLastTrackController,
  updateLastTrackController,
};
