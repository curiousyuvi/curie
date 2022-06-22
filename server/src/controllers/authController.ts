import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request, Response } from "express";
import qs from 'qs'
import generateRandomString from "../helpers/generateRandomString";
const redirect_uri = "http://localhost:3000/spotify_callback/";


const loginController = (req: Request, res: Response) => {
    try {
        const scope = "streaming \
    app-remote-control \
    user-modify-playback-state \
    user-read-playback-state \
    user-read-currently-playing \
    user-read-email";

        const state = generateRandomString(16);

        const auth_query_parameters = new URLSearchParams({
            response_type: "code",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope,
            redirect_uri,
            state
        });

        res.header("Content-Type", "application/json");
        res.header("Accept", "application/json");
        res.redirect(
            "https://accounts.spotify.com/authorize/?" +
            auth_query_parameters.toString()
        );
    } catch (err) {
        console.log("Error in Login Controller :", err);
    }
}

const tokenController = (req: Request, res: Response) => {
    const code = req.query.code;

    const requestConfig: AxiosRequestConfig = {
        url: 'https://accounts.spotify.com/api/token',
        method: "post",
        headers: {
            "Authorization":
                "Basic " +
                Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
                    "base64"
                ),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: 'json',
        responseEncoding: 'utf8',
        data: qs.stringify({
            code,
            redirect_uri,
            grant_type: "authorization_code",
        }),
    }

    axios(requestConfig).then((response: AxiosResponse) => {
        if (response.status === 200) {
            res.cookie('refresh_token', response.data.refresh_token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 86400000 })
            res.json({
                token: response.data.access_token,
            });
        } else {
            res.status(401).json({ error: "Error in getting token from spotify" })
        }
    }).catch(err => {

        res.status(400).json({ error: err })
    })
}

const refreshController = (req: Request, res: Response) => {
    if (!req.cookies?.refresh_token) return res.sendStatus(401);

    const refresh_token = req.cookies.refresh_token;
    const requestConfig: AxiosRequestConfig = {
        url: 'https://accounts.spotify.com/api/token',
        method: "post",
        headers: {
            "Authorization":
                "Basic " +
                Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString(
                    "base64"
                ),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: 'json',
        responseEncoding: 'utf8',
        data: qs.stringify({
            refresh_token,
            grant_type: "refresh_token",
        }),
    }

    axios(requestConfig).then((response: AxiosResponse) => {
        if (response.status === 200) {
            res.json({
                token: response.data.access_token,
            });
        } else {

            res.status(403).json({ error: "Error in refreshing token from spotify" })
        }
    }).catch(err => {
        res.status(400).json({ error: err })
    })
}

export { loginController, tokenController, refreshController }

