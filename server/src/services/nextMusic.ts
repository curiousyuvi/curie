import axios from "axios";

const nextMusic = async (token) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player/next",
            method: 'post',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const response = await axios(requestConfig);

        if (response.status === 204) {
            return true
        }
        else
            return false;
    } catch (err) {
        console.log('Error in skipping to next music: ', err);
        return false;
    }
}

export default nextMusic