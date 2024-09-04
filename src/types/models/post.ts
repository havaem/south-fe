import { Value } from "@udecode/plate-common";
import { z } from "zod";

import { profileSchema } from "./profile";

export const postSchema = z.object({
    _id: z.string(),
    author: z.string(),
    author_profile: profileSchema.pick({
        _id: true,
        user: true,
        name: true,
        avatar: true,
    }),
    media: z.array(
        z.object({
            type: z.string(),
            url: z.string(),
        }),
    ),
    likes: z.array(z.string()),
    comments: z.array(z.string()),
    content: z.string().transform((val) => JSON.parse(val) as Value),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
});

export type IPost = z.infer<typeof postSchema>;
