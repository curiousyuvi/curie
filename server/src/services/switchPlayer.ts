import axios from "axios";

const switchPlayer = async (deviceId, token: string) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player",
            data: { device_ids: [deviceId] },
            method: 'put',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 204 || response.status === 202 || response.status === 200) {
            return true
        }
        else
            return false;
    } catch (err) {
        console.log('Error in Switching player: ', err.response.data);
        return false;
    }
}

export default switchPlayer