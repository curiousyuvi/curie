import axios from "axios";

const playMusic = async (uri, position, token) => {
    try {
        console.log('data to be sent: ', {
            context_uri: uri,
            position_ms: position
        })
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/play",
            method: 'put',
            data: {
                context_uri: uri,
                position_ms: position
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        const response = await axios(requestConfig);
        console.log(response.status)

        if (response.status === 204) {
            return true
        }
        else
            return false;
    } catch (err) {
        console.log('Error in playing music: ', err);
        return false;
    }
}

export default playMusic