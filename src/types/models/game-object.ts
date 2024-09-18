import { z } from "zod";

import { OBJECT_TYPE } from "@/games/constants";

export const gameObjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    type: z.nativeEnum(OBJECT_TYPE),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    index: z.number(),
    data: z.any(),
});

export type IGameObject = z.infer<typeof gameObjectSchema>;
