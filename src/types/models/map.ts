import { z } from "zod";

export const mapSchema = z.object({
    _id: z.string(),
    name: z.string(),
    upperLayer: z
        .object({
            _id: z.string(),
            src: z.string(),
        })
        .nullable(),
    lowerLayer: z.object({
        _id: z.string(),
        src: z.string(),
    }),
    grid: z.array(z.array(z.number())),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type IMap = z.infer<typeof mapSchema>;
