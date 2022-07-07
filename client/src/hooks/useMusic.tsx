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
      console.error("Error in searching music: ", response.data);
      return [];
    }
  } catch (err) {
    console.error("Error in searching music: ", err);
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
    if (response.status === 204) {
      return true;
    } else {
      console.error("Error in switching player: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in switching player: ", err);
    return false;
  }
};

const play = async (
  token: string,
  apiInstance: AxiosInstance,
  uri?: string,
  position?: number,
  deviceId?: string
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/play/${token}`,
      data: {
        uri,
        position,
      },
      params: {
        device_id: deviceId,
      },
      method: "put",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.error("Error in play/resume: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in play/resume: ", err);
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
      console.error("Error in pause: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in pause: ", err);
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
      console.error("Error in skipping to next music: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in skipping to next music: ", err);
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
      console.error("Error in skipping to previous music: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in skipping to previous music: ", err);
    return false;
  }
};

const addToQueue = async (
  token: string,
  uri: string,
  apiInstance: AxiosInstance
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/add_to_queue/${token}`,
      data: { uri },
      method: "post",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 204) {
      return true;
    } else {
      console.error("Error in adding music to queue: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in adding music to queue: ", err);
    return false;
  }
};

const useMusic = () => {
  return { searchMusic, switchPlayer, play, pause, next, previous, addToQueue };
};

export default useMusic;
