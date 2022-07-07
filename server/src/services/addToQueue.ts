import axios from "axios";

const addToQueue = async (uri, token) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/queue",
            method: 'post',
            params: {
                uri
            },
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 204 || response.status === 202 || response.status === 200)
            return true
        else
            return false;
    } catch (err) {
        console.error('Error in skipping to adding to queue: ', err.response.data);
        return false;
    }
}

export default addToQueue