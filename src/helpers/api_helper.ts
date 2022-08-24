import axios from "axios";
import { getCookie } from ".";
import { constants } from "../Components/constants";
import { config } from "../config";

const axiosInstance = axios.create({
    baseURL: config.api.API_URL,
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(function (config) {
    const token = getCookie(constants.AUTH_KEY);
    if (config.headers) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

export { axiosInstance };
