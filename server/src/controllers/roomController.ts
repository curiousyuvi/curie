import e, { Request, Response } from "express"
import User from "../models/User";
import createRoom from "../services/createRoom";
import deleteRoom from "../services/deleteRoom";
import getRoom from "../services/getRoom";
import updateRoom from "../services/updateRoom";


const createRoomController = (req: Request, res: Response) => {
      createRoom(req.body,(err)=>{
        if (!err) {
            res.status(200).json({ message: "success" });
        } else {
            console.log("Error in create user: ", err);
            res.status(400).json({ message: "failure" });
        }  
      })
}

const getRoomController = (req: Request, res: Response) => {
  getRoom(req.params.rid, (err, docs) => {
      if (!err) {
          if (docs)
              res.status(200).json({ rid: docs._id, name: docs.name, state: docs.state,  image_url: docs.image_url, users: docs.users, messages:docs.messages })
          else
              res.status(404).json({ message: "user not found" })
      }
      else {
          res.status(400).json({ message: "failure" })
      }
  })
}

const deleteRoomController = (req: Request, res: Response) => {
  deleteRoom(req.params.rid, (err, docs) => {
      if (!err)
          if (docs)
              res.status(200).json({ message: "success" })
          else
              res.status(404).json({ message: "user not found" })
      else
          res.status(400).json({ message: "failure" })
  })
}

const updateRoomController = (req: Request, res: Response) => {
  updateRoom(req.params.rid, req.body, (err, docs) => {
      if (!err)
          if (docs)
              res.status(200).json({ massage: "success" })
          else
              res.status(404).json({ message: "user not found" })
      else
          res.status(400).json({ message: "failure" })
  })
}

export {createRoomController, getRoomController, deleteRoomController, updateRoomController}