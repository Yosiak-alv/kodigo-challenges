import axios from "axios";

export const axiosRouteWithoutToken = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }
});

export const axiosRouteWithToken = axios.create({
    baseURL: "http://localhost:8000/api/v1",
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