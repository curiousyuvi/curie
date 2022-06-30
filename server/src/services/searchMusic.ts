import axios from "axios";
import { query } from "express";

const searchMusic = async (token, query) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/search",
            params: { q: query, type: 'track', limit: 20 },
            method: 'get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 200) {

            const tracks = response.data.tracks.items.map(track => {
                return {
                    id: track.id, name: track.name, uri: track.uri, duration: track.duration_ms, artists: track.artists.map(artist => {
                        return artist.name
                    }), thumbnail: track.album.images[1].url
                }
            })

            return tracks;
        }
        else
            return null;
    } catch (err) {
        console.log('Error in Music Search: ', err);
        return null;
    }
}

export default searchMusic