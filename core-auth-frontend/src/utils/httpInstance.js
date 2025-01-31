import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const axiosRouteWithoutToken = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

export const axiosRouteWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

axiosRouteWithToken.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);