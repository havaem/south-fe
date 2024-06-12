import { z } from "zod";

import { UserSchema } from "../models";

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

export const zAuthResponse = z.object({
    token: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    user: UserSchema,
});

export interface IAuthRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export type IAuthResponse = z.infer<typeof zAuthResponse>;
