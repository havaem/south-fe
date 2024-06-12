import { REGEX } from "@/constants";
import { z } from "@/i18n";

export const signInSchema = z.object({
    username: z.string().regex(REGEX.usernameLogin).default(""),
    password: z.string().regex(REGEX.password).default(""),
});
