import axios from "axios";

const pauseMusic = async (token) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/pause",
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await axios(requestConfig);

        if (response.status === 204 || response.status === 202 || response.status === 200) {
            return true
        }
        else
            return false;
    } catch (err) {
        console.log('Error in pausing music: ', err);
        return false;
    }
}

export default pauseMusic