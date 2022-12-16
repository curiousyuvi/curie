import { Request, Response } from "express"
import createRoom from "../services/createRoom";
import deleteRoom from "../services/deleteRoom";
import getRoom from "../services/getRoom";

const createRoomController = (req: Request, res: Response) => {
    createRoom(req.body, (err) => {
        if (!err) {
            res.status(200).json({ message: "success" });
        } else {
            console.error("Error in create room: ", err);
            res.status(400).json({ message: "failure" });
        }
    })
}

const getRoomController = (req: Request, res: Response) => {
    getRoom(req.params.rid, (err, docs) => {
        if (!err) {
            if (docs)
                res.status(200).json({
                    rid: docs.rid, name: docs.name, image_url: docs.image_url,
                })

            else
                res.status(404).json({ message: "room not found" })
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
                res.status(404).json({ message: "room not found" })
        else
            res.status(400).json({ message: "failure" })
    })
}




export { createRoomController, getRoomController, deleteRoomController, }