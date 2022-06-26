import { Request, Response } from "express"
import createRoom from "../services/createRoom";
import deleteRoom from "../services/deleteRoom";
import getRoom from "../services/getRoom";
import getRoomShort from "../services/getRoomShort";
import joinUser from "../services/joinUser";
import removeUser from "../services/removeUser";
import updateRoom from "../services/updateRoom";


const createRoomController = (req: Request, res: Response) => {
    createRoom(req.body, (err) => {
        if (!err) {
            res.status(200).json({ message: "success" });
        } else {
            console.log("Error in create user: ", err);
            res.status(400).json({ message: "failure" });
        }
    })
}

const getRoomController = (req: Request, res: Response) => {
    const short = req.query.short;
    if (!short)
        getRoom(req.params.rid, (err, docs) => {
            if (!err) {
                if (docs)
                    res.status(200).json({
                        rid: docs._id, name: docs.name, state: docs.state, image_url: docs.image_url, users: docs.users, messages: docs.messages.map(message => {
                            return { mid: message._id, type: message.type, content: message.content, sender: message.sender }
                        })
                    })

                else
                    res.status(404).json({ message: "user not found" })
            }
            else {
                res.status(400).json({ message: "failure" })
            }
        })
    else
        getRoomShort(req.params.rid, (err, docs) => {
            if (!err) {
                if (docs)
                    res.status(200).json({
                        rid: docs._id, name: docs.name, image_url: docs.image_url
                    })
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

const joinUserController = (req: Request, res: Response) => {
    joinUser(req.params.rid, req.query.uid, (err) => {
        if (!err)
            res.status(200).json({ massage: "success" })
        else
            res.status(400).json({ message: "failure" })
    })
}

const removeUserController = (req: Request, res: Response) => {
    removeUser(req.params.rid, req.query.uid, (err) => {
        if (!err)
            res.status(200).json({ massage: "success" })
        else
            res.status(400).json({ message: "failure" })
    })
}

export { createRoomController, getRoomController, deleteRoomController, updateRoomController, joinUserController, removeUserController }