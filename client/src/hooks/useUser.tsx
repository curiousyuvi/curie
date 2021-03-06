import { AxiosInstance, AxiosRequestConfig } from "axios";
import { apiInstance } from "../api/axiosInstances";
import { User } from "../interfaces/User";
import { UserShort } from "../interfaces/UserShort";

const getUser = async (uid: string): Promise<User | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/${uid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error in getUser: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getUser: ", err);
    return null;
  }
};

const getUserShort = async (uid: string): Promise<UserShort | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/${uid}`,
      method: "get",
      params: { short: "true" },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error in getUserShort: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getUserShort: ", err);
    return null;
  }
};

const createUser = async (user: User): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: "/user/create",
      method: "post",
      data: user,
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.error("Error in createUser: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in createUser: ", err);
    return null;
  }
};

const updateUser = async (
  uid: string,
  updateDoc: {
    name?: string;
    avatar_url?: string;
    rooms?: string[];
    status?: string;
  }
): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/update/${uid}`,
      method: "post",
      data: updateDoc,
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.error("Error in updateUser: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in updateUser: ", err);
    return null;
  }
};

const deleteUser = async (uid: string): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/${uid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.error("Error in getUser: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getUser: ", err);
    return null;
  }
};

const getUID = async (
  token: string,
  apiInstance: AxiosInstance
): Promise<string | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/uid/${token}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data.uid;
    } else {
      console.error("Error in getUID: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getUID: ", err);
    return null;
  }
};

const getPremiumStatus = async (
  token: string,
  apiInstance: AxiosInstance
): Promise<"free" | "premium" | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/premium_status/${token}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data.status;
    } else {
      console.error("Error in getPremiumStatus: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in getPremiumStatus: ", err);
    return null;
  }
};

const searchUser = async (
  username: string,
  strict: boolean = false
): Promise<User[] | null> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/search/${username}`,
      method: "get",
      responseType: "json",
      params: { strict },
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return response.data.users;
    } else {
      console.error("Error in searchUser: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in searchUser: ", err);
    return null;
  }
};

const userExists = async (uid: string) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/exists/${uid}`,
      method: "get",
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      if (response.data.result === "user exists") return true;
      else return false;
    } else {
      console.error("Error in userExists: ", response.data);
      return null;
    }
  } catch (err) {
    console.error("Error in userExists: ", err);
    return null;
  }
};

const joinRoom = async (uid: string, rid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/join_room/${uid}`,
      method: "get",
      params: { rid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error in joinRoom: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in joinRoom: ", err);
    return false;
  }
};

const removeRoom = async (uid: string, rid: string): Promise<boolean> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/user/remove_room/${uid}`,
      method: "get",
      params: { rid },
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error in removeRoom: ", response.data);
      return false;
    }
  } catch (err) {
    console.error("Error in removeRoom: ", err);
    return false;
  }
};

const useUser = () => {
  return {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUID,
    searchUser,
    userExists,
    getUserShort,
    joinRoom,
    removeRoom,
    getPremiumStatus,
  };
};

export default useUser;
