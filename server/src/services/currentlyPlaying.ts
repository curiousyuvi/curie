import axios from "axios";

const getCurrentlyPlaying = async (token) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/currently-playing",
            method: 'get',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 200)
            return response.data;
        else
            return null;
    } catch (err) {
        console.log('Error in getting currently playing: ', err.response.data);
        return null;
    }
}

export default getCurrentlyPlaying