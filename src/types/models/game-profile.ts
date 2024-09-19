import { z } from "zod";

import { userSchema } from "./user";

export const gameProfileSchema = z.object({
    _id: z.string(),
    user: userSchema.pick({
        _id: true,
        email: true,
        username: true,
    }),
    hero: z.string(),
});
export type IGameProfile = z.infer<typeof gameProfileSchema>;
