import { z } from "zod";

import { userSchema } from "./user";

const profileName = z.object({
    first: z.string(),
    middle: z.string().optional(),
    last: z.string(),
    display: z.number(),
});

export const profileSchema = z.object({
    _id: z.string(),

    user: userSchema.pick({
        _id: true,
        email: true,
        username: true,
    }),
    name: profileName,
    avatar: z.string(),
    cover: z.string(),
});

export type IProfile = z.infer<typeof profileSchema>;
