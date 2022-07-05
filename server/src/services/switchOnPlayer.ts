import axios from "axios";

const switchOnPlayer = async (deviceId, token: string) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player",
            params: { device_ids: [deviceId] },
            method: 'put',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 200) {

            return true
        }
        else
            return false;
    } catch (err) {
        console.log('Error in Switching player: ', err);
        return false;
    }
}

export default switchOnPlayer