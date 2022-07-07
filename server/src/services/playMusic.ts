import axios from "axios";

const playMusic = async (uri, position, deviceId, token) => {
    const requestBody = {
        uris: undefined,
        position_ms: position
    };
    if (uri) requestBody.uris = [uri]
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/play",
            method: 'put',
            data: requestBody,
            params: {
                device_id: deviceId
            },
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
        console.error('Error in playing music: ', err.response.data);
        return false;
    }
}

export default playMusic