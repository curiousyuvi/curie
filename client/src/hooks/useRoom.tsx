import { AxiosRequestConfig } from "axios";
import { apiInstance } from "../api/axiosInstances";
import { Room } from "../interfaces/Room";
import { RoomShort } from "../interfaces/RoomShort";

const getRoom = async (rid: string): Promise<Room | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/${rid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error in getRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.log("Error in getRoom: ", err);
    return null;
  }
};

const joinUser = async (rid: string, uid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/join_user/${rid}`,
      method: "get",
      params: { uid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.log("Error in joinUser: ", response.data);
      return false;
    }
  } catch (err) {
    console.log("Error in joinUser: ", err);
    return false;
  }
};

const getRoomShort = async (rid: string): Promise<RoomShort | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/${rid}`,
      method: "get",
      params: { short: "true" },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Error in getRoomShort: ", response.data);
      return null;
    }
  } catch (err) {
    console.log("Error in getRoomShort: ", err);
    return null;
  }
};

const createRoom = async (room: Room): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: "/room/create",
      method: "post",
      data: room,
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.log("Error in createRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.log("Error in createRoom: ", err);
    return null;
  }
};

const updateRoom = async (
  rid: string,
  updateDoc: {
    name?: string;
    image_url?: string;
  }
): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/update/${rid}`,
      method: "post",
      data: updateDoc,
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.log("Error in updateRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.log("Error in updateRoom: ", err);
    return null;
  }
};

const deleteRoom = async (rid: string): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/${rid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.log("Error in getRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.log("Error in getRoom: ", err);
    return null;
  }
};

const useRoom = () => {
  return {
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomShort,
    joinUser,
  };
};

export default useRoom;
