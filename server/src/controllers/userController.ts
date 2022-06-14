import { Request, Response } from "express"
import createUser from "../services/createUser"

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

export { createUserController }