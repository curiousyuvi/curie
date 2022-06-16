import e, { Request, Response } from "express"
import User from "../models/User";
import createUser from "../services/createUser"
import deleteUser from "../services/deleteUser";
import getUID from "../services/getUID";
import getUser from "../services/getUser";
import updateUser from "../services/updateUser";

const createUserController = (req: Request, res: Response) => {
    createUser(req.body, (err) => {
        if (!err) {
            res.status(200).json({ message: "success" });
        } else {
            console.log("Error in create user: ", err);
            res.status(400).json({ message: "failure" });
        }
    })
}

const getUserController = (req: Request, res: Response) => {
    getUser(req.params.uid, (err, docs) => {
        console.log("docs: ", docs)
        console.log("err: ", err)

        if (!err) {
            if (docs)
                res.status(200).json({ uid: docs._id, name: docs.name, username: docs.username, status: docs.status, avatar_url: docs.avatar_url, rooms: docs.rooms })
            else
                res.status(404).json({ message: "user not found" })
        }
        else {
            res.status(400).json({ message: "failure" })
        }
    })
}

const deleteUserController = (req: Request, res: Response) => {
    deleteUser(req.params.uid, (err, docs) => {
        if (!err)
            if (docs)
                res.status(200).json({ message: "success" })
            else
                res.status(404).json({ message: "user not found" })
        else
            res.status(400).json({ message: "failure" })
    })
}

const updateUserController = (req: Request, res: Response) => {
    updateUser(req.params.uid, req.body, (err, docs) => {
        if (!err)
            if (docs)
                res.status(200).json({ massage: "success" })
            else
                res.status(404).json({ message: "user not found" })
        else
            res.status(400).json({ message: "failure" })
    })
}

const getUIDController = (req: Request, res: Response) => {
    getUID(req.params.token).then(uid => {
        if (uid)
            res.status(200).json({ uid });
        else
            res.status(404).json({ message: "not found" })
    }).catch(err => {
        console.log("Error in getting UID: ", err);
        res.status(400).json({ message: "failure" })
    })
}

export { createUserController, getUserController, updateUserController, deleteUserController, getUIDController }