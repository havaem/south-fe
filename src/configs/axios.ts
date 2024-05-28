import axios from "axios";

import { LOCAL_STORAGE_KEY } from "@/constants";

import { ENV } from "./env";

const axiosService = axios.create({
    baseURL: ENV.API_URL,
    timeout: 10000,
});
axiosService.interceptors.request.use(
    function (config) {
        const accessToken = localStorage?.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(new Error(error));
    },
);

// Add a response interceptor
axiosService.interceptors.response.use(
    function (response) {
        return response.data;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
            localStorage?.removeItem("accessToken");
            const refreshToken = localStorage?.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
            if (refreshToken) {
                originalRequest._retry = true;
                return axiosService
                    .get("/auth/refresh-token", {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    })
                    .then((res) => {
                        if (res.statusCode === 200) {
                            localStorage?.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res.data.token.accessToken);
                            localStorage?.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, res.data.token.refreshToken);
                            originalRequest.headers["Authorization"] = `Bearer ${res.data.token.accessToken}`;
                            return axiosService(originalRequest);
                        }
                    })
                    .catch(() => {
                        localStorage?.removeItem("refreshToken");
                    });
            }
        }
        return Promise.reject(new Error(error?.response?.data ?? error));
    },
);
export const { get, post, put, patch, delete: del } = axiosService;
