import { z } from "zod";

export const spriteSchema = z.object({
    _id: z.string(),
    resource: z.object({
        _id: z.string(),
        type: z.string(),
        src: z.string(),
    }),
    name: z.string(),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    offset: z.object({
        x: z.number(),
        y: z.number(),
    }),
    frameSize: z.object({
        x: z.number(),
        y: z.number(),
    }),
    verticalFrame: z.number(),
    horizontalFrame: z.number(),
    scale: z.number(),
    animations: z.array(
        z.object({
            _id: z.string(),
            name: z.string(),
            duration: z.number(),
            frames: z.array(
                z.object({
                    time: z.number(),
                    frame: z.number(),
                }),
            ),
        }),
    ),
});
export type ISprite = z.infer<typeof spriteSchema>;
