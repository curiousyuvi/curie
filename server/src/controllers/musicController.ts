import { Request, Response } from "express"
import searchMusic from "../services/searchMusic"
import switchOnPlayer from "../services/switchOnPlayer"


const searchMusicController = async (req: Request, res: Response) => {
    const tracks = await searchMusic(req.query.token, req.params.query)

    if (tracks) res.status(200).json({ tracks })
    else res.status(400).json({ message: 'failure' })
}

const switchOnPlayerController = async (req: Request, res: Response) => {
    const deviceId = req.query.device_id;
    const result = await switchOnPlayer(deviceId, req.params.token)

    if (result) res.status(200).json({ message: 'success' })
    else res.status(400).json({ message: 'failure' })
}

export { searchMusicController, switchOnPlayerController }