import axios from "axios";

const apiUrl = "/api";
const apiInstance = axios.create({
    baseURL: apiUrl,
});

const privateApiInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});


export { apiInstance, privateApiInstance }