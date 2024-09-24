import { IUser } from "../models";

export interface IAuthRegisterPayload {
    name: {
        first: string;
        last: string;
    };
    email: string;
    password: string;
}
export interface IAuthLoginWithGooglePayload {
    token: string;
}
export interface IAuthLoginPayload {
    username: string;
    password: string;
}

export interface IAuthRefreshTokenPayload {
    refreshToken: string;
}

export interface IAuthRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthResponse {
    user: IUser;
    token: {
        accessToken: string;
        refreshToken: string;
    };
}
