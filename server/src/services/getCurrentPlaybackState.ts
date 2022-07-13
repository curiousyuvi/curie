import axios from "axios";

const getCurretnPlaybackState = async (token: string) => {
    try {
        const requestConfig = {
            url: "https://api.spotify.com/v1/me/player",
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios(requestConfig);
        if (response.status === 200) {
            const currentDevice = { id: response.data.device.id, name: response.data.device.name, isActive: response.data.device.is_active };

            const progress = response.data.progress_ms;

            const timestamp = response.data.timestamp;

            const playing = response.data.is_playing;

            const currentTrack = { id: response.data.item.id, name: response.data.item.name, uri: response.data.item.uri, duration: response.data.item.duration_ms, thumbnail: response.data.item.album.images[1].url, artists: response.data.item.artists.map(artist => artist.name) }

            return { currentDevice, progress, timestamp, playing, currentTrack }

        } else return null;
    } catch (err) {
        console.error("Error in getting current playback: ", err.response.data);
        return null;
    }
};

export default getCurretnPlaybackState;
