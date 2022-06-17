import axios, { AxiosRequestConfig } from 'axios';
import { RoomShort } from '../models/RoomShort';
import { User } from '../models/User';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiUrl = apiEndpoint + "/api";
const apiInstance = axios.create({
    baseURL: apiUrl
});

const getUser = async (uid: string): Promise<User | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/${uid}`,
            method: "get",
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.log("Error in getUser: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in getUser: ", err);
        return null;
    }
}

const createUser = async (user: User): Promise<string | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: "/user/create",
            method: "post",
            data: user,
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return "success";
        }
        else {
            console.log("Error in createUser: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in createUser: ", err);
        return null;
    }
}

const updateUser = async (uid: string, updateDoc: {
    name?: string;
    avatar_url?: string;
    rooms?: RoomShort[];
    status?: string;
}): Promise<string | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/update/${uid}`,
            method: "post",
            data: updateDoc,
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return "success";
        }
        else {
            console.log("Error in updateUser: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in updateUser: ", err);
        return null;
    }
}

const deleteUser = async (uid: string): Promise<string | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/${uid}`,
            method: "get",
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return "success";
        }
        else {
            console.log("Error in getUser: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in getUser: ", err);
        return null;
    }
}

const getUID = async (token: string): Promise<string | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/uid/${token}`,
            method: "get",
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return response.data.uid;
        }
        else {
            console.log("Error in getUID: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in getUID: ", err);
        return null;
    }
}

const searchUser = async (username: string, strict: boolean = false): Promise<User[] | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/search/${username}`,
            method: "get",
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return response.data.users;
        }
        else {
            console.log("Error in searchUser: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in searchUser: ", err);
        return null;
    }
}

const userExists = async (uid: string) => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: `/user/exists/${uid}`,
            method: "get",
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            if (response.data.result === "user exists")
                return true;
            else
                return false;
        }
        else {
            console.log("Error in userExists: ", response.data);
            return null;
        }
    } catch (err) {
        console.log("Error in userExists: ", err);
        return null;
    }
}

export { getUser, createUser, updateUser, deleteUser, getUID, searchUser, userExists };