import { Request, Response } from "express"
import User from "../models/User";
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

const getUserController = (req:Request,res:Response) => {
      User.find({},(err,allitems)=>{
           if(err){
               console.log("User is not found");
               res.status(400).json({massage:"failure"});
           }else{
               res.status(200).json({allitems})
           }
      })
}

export { createUserController }
export { getUserController }