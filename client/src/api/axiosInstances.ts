import axios from "axios";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiUrl = apiEndpoint + "/api";
const apiInstance = axios.create({
    baseURL: apiUrl,
});

const privateApiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export { apiInstance, privateApiInstance }