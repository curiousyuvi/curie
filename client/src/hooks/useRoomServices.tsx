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
      console.error("Error in getRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getRoom: ", err);
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
      console.error("Error in joinUser: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in joinUser: ", err);
    return false;
  }
};

const removeUser = async (rid: string, uid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/remove_user/${rid}`,
      method: "get",
      params: { uid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error in removeUser: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in removeUser: ", err);
    return false;
  }
};

const addAdmin = async (rid: string, uid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/add_admin/${rid}`,
      method: "get",
      params: { uid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error in addAdmin: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in addAdmin: ", err);
    return false;
  }
};

const removeAdmin = async (rid: string, uid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/remove_admin/${rid}`,
      method: "get",
      params: { uid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error in removeAdmin: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in removeAdmin: ", err);
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
      console.error("Error in getRoomShort: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getRoomShort: ", err);
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
      console.error("Error in createRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in createRoom: ", err);
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
      console.error("Error in updateRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in updateRoom: ", err);
    return null;
  }
};

const deleteRoom = async (rid: string): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/delete/${rid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.error("Error in deleteRoom: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in deleteRoom: ", err);
    return null;
  }
};

const roomExists = async (rid: string) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/exists/${rid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      if (response.data.result === "room exists") return true;
      else return false;
    } else {
      console.error("Error in roomExists: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in roomExists: ", err);
    return null;
  }
};

const useRoomServices = () => {
  return {
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    getRoomShort,
    joinUser,
    removeUser,
    addAdmin,
    removeAdmin,
    roomExists,
  };
};

export default useRoomServices;
