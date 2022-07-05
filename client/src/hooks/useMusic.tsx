import { AxiosInstance, AxiosRequestConfig } from "axios";
import { Track } from "../interfaces/Track";

const searchMusic = async (
  query: string,
  token: string,
  apiInstance: AxiosInstance
): Promise<Track[]> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/search/${query}`,
      params: { token },
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data.tracks;
    } else {
      console.log("Error in getUID: ", response.data);
      return [];
    }
  } catch (err) {
    console.log("Error in getUID: ", err);
    return [];
  }
};

const switchOnPlayer = async (
  deviceId: string,
  token: string,
  apiInstance: AxiosInstance
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/switch_on_player/${token}`,
      params: { device_id: deviceId },
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.log("Error in getUID: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in getUID: ", err);
    return false;
  }
};

const useMusic = () => {
  return { searchTrack: searchMusic, switchOnPlayer };
};

export default useMusic;
