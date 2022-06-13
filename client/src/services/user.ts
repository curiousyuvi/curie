import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../models/User';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiUrl = apiEndpoint + "/api";
const apiInstance = axios.create({
    baseURL: apiUrl
});

const getUser = async (token: string): Promise<User | null> => {
    //TODO: remove mock code
    const mockCurrentUser: User = { uid: "696969", name: "Yuvraj Singh", username: "curiousyuvi", avatar_url: "https://images.unsplash.com/photo-1577975882846-431adc8c2009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80", rooms: [{ rid: "1212", name: "Lofi munde🔥", image_url: "https://images.unsplash.com/photo-1532117364815-720cd35ff6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80", state: "" }, { rid: "1212", name: "Lofi munde🔥", image_url: "https://images.unsplash.com/photo-1532117364815-720cd35ff6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80", state: "" }, { rid: "1212", name: "Lofi munde🔥", image_url: "https://images.unsplash.com/photo-1532117364815-720cd35ff6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80", state: "" }, { rid: "1212", name: "Lofi munde🔥", image_url: "https://images.unsplash.com/photo-1532117364815-720cd35ff6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80", state: "" }], status: "🔥 chillin" };
    return mockCurrentUser;

    // try {
    //     const requestConfig: AxiosRequestConfig = {
    //         url: "/user",
    //         method: "get",
    //         params: {
    //             uid
    //         },
    //         responseType: 'json',
    //     };

    //     const response = await apiInstance(requestConfig);
    //     if (response.status === 200) {
    //         return response.data;
    //     }
    //     else {
    //         console.log("Error in getUser: ", response.data.error);
    //     }
    // } catch (err) {
    //     console.log("Error in getUser: ", err);

    // }

}

export { getUser };