import { z } from "zod";

import { OBJECT_TYPE } from "@/games/constants";

import { spriteSchema } from "./sprite";

export const gameObjectSchema = z.object({
    _id: z.string(),
    name: z.string(),
    type: z.nativeEnum(OBJECT_TYPE),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    index: z.number(),
    data: z.object({
        body: spriteSchema.optional(),
        eye: spriteSchema.optional(),
        hair: spriteSchema.optional(),
        outfit: spriteSchema.optional(),
    }),
});

export type IGameObject = z.infer<typeof gameObjectSchema>;
