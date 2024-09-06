import { z } from "zod";

import { userSchema } from "./user";

export const gameProfileSchema = z.object({
    _id: z.string(),
    user: userSchema.pick({
        _id: true,
        email: true,
        username: true,
    }),
    hero: z.object({
        _id: z.string(),
        name: z.string(),
        type: z.string(),
        position: z.object({
            x: z.number(),
            y: z.number(),
        }),
        index: z.number(),
        data: z.any(),
    }),
});
export type IGameProfile = z.infer<typeof gameProfileSchema>;
