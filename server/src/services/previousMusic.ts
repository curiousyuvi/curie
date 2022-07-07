import axios from "axios";

const previousMusic = async (token) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/previous",
            method: 'post',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 204 || response.status === 202 || response.status === 200) {
            return true
        }
        else
            return false;
    } catch (err) {
        console.error('Error in skipping to previous music: ', err.response.data);
        return false;
    }
}

export default previousMusic