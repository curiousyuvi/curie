import { Request, Response } from "express";
import getMessages from "../services/getMessages";
import postMessage from "../services/postMessage";

const getMessagesController = (req: Request, res: Response) => {
  getMessages(req.params.rid, req?.query?.after, (err, docs) => {
    if (!err) {
      if (docs)
        res.status(200).json(
          docs.map((doc) => {
            return { ...doc._doc, mid: doc._doc._id };
          })
        );
      else res.status(404).json({ message: "messages not found" });
    } else {
      res.status(400).json({ message: "failure" });
    }
  });
};
const postMessageController = (req: Request, res: Response) => {
  postMessage(req.body, (err) => {
    if (!err) {
      res.status(200).json({ message: "message posted" });
    } else {
      res.status(400).json({ message: "failure" });
    }
  });
};

export { getMessagesController, postMessageController };
