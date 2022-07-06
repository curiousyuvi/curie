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

const switchPlayer = async (
  deviceId: string,
  token: string,
  apiInstance: AxiosInstance
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/switch_player/${token}`,
      params: { device_id: deviceId },
      method: "put",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (
      response.status === 204 ||
      response.status === 202 ||
      response.status === 200
    ) {
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

const play = async (
  token: string,
  apiInstance: AxiosInstance,
  uri?: string,
  position?: number
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/play/${token}`,
      data: {
        uri,
        position,
      },
      method: "put",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.log("Error in play/resume: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in play/resume: ", err);
    return false;
  }
};

const pause = async (token: string, apiInstance: AxiosInstance) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/pause/${token}`,
      method: "put",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.log("Error in pause: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in pause: ", err);
    return false;
  }
};

const next = async (token: string, apiInstance: AxiosInstance) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/next/${token}`,
      method: "post",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.log("Error in skipping to next music: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in skipping to next music: ", err);
    return false;
  }
};

const previous = async (token: string, apiInstance: AxiosInstance) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/previous/${token}`,
      method: "post",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.log("Error in skipping to previous music: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in skipping to previous music: ", err);
    return false;
  }
};

const useMusic = () => {
  return { searchMusic, switchPlayer, play, pause, next, previous };
};

export default useMusic;
