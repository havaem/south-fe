import { get, post } from "@/configs";
import {
    IAuthLoginPayload,
    IAuthLoginWithGooglePayload,
    IAuthRefreshTokenPayload,
    IAuthRefreshTokenResponse,
    IAuthRegisterPayload,
    IAuthResponse,
    IUser,
} from "@/types";

const ENDPOINT = "/auth";
export const ApiAuth = {
    getProfile: () => get<IUser>(ENDPOINT),
    register: (data: IAuthRegisterPayload) => post<IAuthResponse>(`${ENDPOINT}/register`, data),
    login: (data: IAuthLoginPayload) => post<IAuthResponse>(`${ENDPOINT}/login`, data),
    loginWithGoogle: (data: IAuthLoginWithGooglePayload) => post<IAuthResponse>(`${ENDPOINT}/login-with-google`, data),
    getRefreshToken: (data: IAuthRefreshTokenPayload) =>
        post<IAuthRefreshTokenResponse>(`${ENDPOINT}/refresh-token`, data),
};
