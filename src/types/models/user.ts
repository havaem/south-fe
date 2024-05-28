import { z } from "zod";

const userName = z.object({
    first: z.string(),
    middle: z.string(),
    last: z.string(),
    display: z.number(),
});

const userStatus = z.object({
    isVerified: z.boolean(),
    isActive: z.boolean(),
    isFirstLogin: z.boolean(),
});

export const UserSchema = z.object({
    _id: z.string(),
    name: userName,
    email: z.string(),
    username: z.string(),
    status: userStatus,
});

export type IUser = z.infer<typeof UserSchema>;
