import { z } from "zod";

export enum EResourceType {
    MAP_LOWER = "MAP_LOWER",
    MAP_UPPER = "MAP_UPPER",

    CHARACTER_BODY = "CHARACTER_BODY",
    CHARACTER_EYES = "CHARACTER_EYES",
    CHARACTER_OUTFIT = "CHARACTER_OUTFIT",
    CHARACTER_HAIR = "CHARACTER_HAIR",
    CHARACTER_ACCESSORY = "CHARACTER_ACCESSORY",
}
export const resourceSchema = z.object({
    _id: z.string(),
    type: z.nativeEnum(EResourceType),
    src: z.string(),
});

export type IResource = z.infer<typeof resourceSchema>;
