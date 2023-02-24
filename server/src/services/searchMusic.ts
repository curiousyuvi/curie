import axios from "axios";
import { Track } from "../interfaces/Track";

// TODO: implement Yotube search api

const searchMusic = async (query) => {
  try {
    const requestConfig = {
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        part: "snippet",
        q: query,
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 20,
      },
      method: "get",
    };

    const response = await axios(requestConfig);

    if (response.status === 200) {
      const tracks: Track[] = response.data.items.map((track) => {
        return {
          id: track.id.videoId,
          name: track.snippet.title,
          channel: track.snippet.channelTitle,
          thumbnail: track.snippet.thumbnails.default.url,
        };
      });

      return tracks;
    } else return null;
  } catch (err) {
    console.error("Error in Music Search: ", err.response.data);
    return null;
  }
};

export default searchMusic;
