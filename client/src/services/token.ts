import axios, { AxiosRequestConfig } from "axios";
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiUrl = apiEndpoint + "/api";
const apiInstance = axios.create({
    baseURL: apiUrl
});

const getToken = async (code: string): Promise<{ token: string; refresh_token: string } | null> => {
    try {
        const requestConfig: AxiosRequestConfig = {
            url: "/auth/token",
            method: "get",
            params: { code },
            responseType: 'json',
        };

        const response = await apiInstance(requestConfig);
        if (response.status === 200) {
            return response.data;
        }
        else {
            console.log("Error in getToken: ", response.data.error);
            return null;
        }
    } catch (err) {
        console.log("Error in getToken: ", err);
        return null;

    }
}

export { getToken }