import axios from "axios";

const getUID: (token: string) => Promise<string | null> = async (token) => {
    const requestConfig = {
        url: "https://api.spotify.com/v1/me",
        method: 'get',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const response = await axios(requestConfig);

    if (response.status === 200)
        return response.data.id;
    else
        return null;
}

export default getUID