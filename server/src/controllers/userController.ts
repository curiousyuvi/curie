import { Request, Response } from "express"
import User from "../models/User";
import createUser from "../services/createUser"
import getUser from "../services/getUser";

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

const getUserController = (req:Request,res:Response) => {
    getUser(req.params.uid,(err,docs)=>{

        if(!err){
            if(docs)
            res.status(200).json({uid:docs._id,name:docs.name,username:docs.username,status:docs.status,avatar_url:docs.avatar_url,rooms:docs.rooms})
            else
            res.status(404).json({ message: "failure" })
        }
        else{
            res.status(404).json({ message: "failure" })
        }
    })
}

export { createUserController }
export { getUserController }