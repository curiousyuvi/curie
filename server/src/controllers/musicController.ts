import { Request, Response } from "express"
import addToQueue from "../services/addToQueue"
import getCurrentlyPlaying from "../services/currentlyPlaying"
import getPlayers from "../services/getPlayers"
import nextMusic from "../services/nextMusic"
import pauseMusic from "../services/pauseMusic"
import playMusic from "../services/playMusic"
import previousMusic from "../services/previousMusic"
import searchMusic from "../services/searchMusic"
import switchPlayer from "../services/switchPlayer"

const searchMusicController = async (req: Request, res: Response) => {
    const tracks = await searchMusic(req.query.token, req.params.query)

    if (tracks) res.status(200).json({ tracks })
    else res.status(403).json({ message: 'failure' })
}

const currentlyPlayingController = async (req: Request, res: Response) => {
    const result = await getCurrentlyPlaying(req.params.token)

    if (result) res.status(200).json(result)
    else res.status(403).json({ message: 'failure' })
}

const switchPlayerController = async (req: Request, res: Response) => {
    const deviceId = req.params.device_id;
    const play = req.body.play;
    const result = await switchPlayer(deviceId, play, req.body.token)

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const playMusicController = async (req: Request, res: Response) => {
    const uri = req.body.uri;
    const position = req.body.position;
    const deviceId = req.body.device_id
    const token = req.params.token;


    const result = await playMusic(uri, position, deviceId, token);

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const pauseMusicController = async (req: Request, res: Response) => {
    const token = req.params.token;


    const result = await pauseMusic(token);

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const previousMusicController = async (req: Request, res: Response) => {
    const token = req.params.token;
    const result = await previousMusic(token);

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const nextMusicController = async (req: Request, res: Response) => {
    const token = req.params.token;
    const result = await nextMusic(token);

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const addToQueueController = async (req: Request, res: Response) => {
    const uri = req.body.uri
    const token = req.params.token;


    const result = await addToQueue(uri, token);

    if (result) res.status(204).json({ message: 'success' })
    else res.status(403).json({ message: 'failure' })
}

const getPlayersMusicController = async (req: Request, res: Response) => {
    const players = await getPlayers(req.params.token)

    if (players) res.status(200).json({ players })
    else res.status(403).json({ message: 'failure' })
}

export {
    searchMusicController,
    getPlayersMusicController,
    switchPlayerController,
    playMusicController,
    pauseMusicController,
    previousMusicController,
    nextMusicController,
    addToQueueController,
    currentlyPlayingController
}