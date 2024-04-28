import axios from "axios";

const axiosService = axios.create({
    baseURL: process.env.API_URL,
});
axiosService.interceptors.request.use(
    function (config) {
        const accessToken = localStorage?.getItem("accessToken");
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
            const refreshToken = localStorage?.getItem("refreshToken");
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
                            localStorage?.setItem("accessToken", res.data.token.accessToken);
                            localStorage?.setItem("refreshToken", res.data.token.refreshToken);
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
