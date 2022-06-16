import e, { Request, Response } from "express"
import User from "../models/User";
import createRoom from "../services/createRoom";


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

export {createRoomController}