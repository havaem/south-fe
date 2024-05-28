import { z } from "zod";

import { IUser, UserSchema } from "../models";

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

export const zAuthResponse = z.object({
    token: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
    }),
    user: UserSchema,
});
export type IAuthResponse = z.infer<typeof zAuthResponse>;
