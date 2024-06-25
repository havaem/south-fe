import { z } from "zod";

import { ELocale } from "@/constants";

const userName = z.object({
    first: z.string(),
    middle: z.string().optional(),
    last: z.string(),
    display: z.number(),
});

const userStatus = z.object({
    isVerified: z.boolean(),
    isActive: z.boolean(),
    isFirstLogin: z.boolean(),
});

const locales = Object.values(ELocale);
const userLocale = z.enum(locales as [string, ...string[]]);

export const userSchema = z.object({
    _id: z.string(),
    name: userName,
    email: z.string(),
    username: z.string(),
    status: userStatus,
    roles: z.array(z.string()),
    locale: userLocale,
    avatar: z.string(),
});

export type IUser = z.infer<typeof userSchema>;
