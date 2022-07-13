import { AxiosInstance, AxiosRequestConfig } from "axios";
import { PlaybackState } from "../interfaces/PlaybackState";
import { Device } from "../interfaces/Device";
import { Track } from "../interfaces/Track";

const searchMusic = async (
  query: string,
  token: string,
  apiInstance: AxiosInstance
): Promise<Track[]> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/search/${token}`,
      params: { query },
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
  token: string,
  deviceId: string,
  apiInstance: AxiosInstance,
  play?: boolean
) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/switch_player/${token}`,
      data: { device_id: deviceId, play },
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

const getDevices: (
  token: string,
  apiInstance: AxiosInstance
) => Promise<Device[]> = async (token, apiInstance) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/devices/${token}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data.devices;
    } else {
      console.error("Error in getting devices: ", response.data);
      return [];
    }
  } catch (err) {
    console.error("Error in getting devices: ", err);
    return [];
  }
};

const getCurrentPlaybackState: (
  token: string,
  apiInstance: AxiosInstance
) => Promise<PlaybackState | null> = async (token, apiInstance) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/music/current_playback_state/${token}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error in getting current playback state: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getting current playback state: ", err);
    return null;
  }
};

const useMusic = () => {
  return {
    searchMusic,
    switchPlayer,
    play,
    pause,
    next,
    previous,
    addToQueue,
    getDevices,
    getCurrentPlaybackState,
  };
};

export default useMusic;
