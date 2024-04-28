import { z } from "zod";

import { REGEX } from "@/constants";

export const signInSchema = z.object({
    username: z.string().regex(REGEX.usernameLogin, {
        message: "invalid username",
    }),
    password: z.string().regex(REGEX.password, {
        message: "invalid password",
    }),
});
