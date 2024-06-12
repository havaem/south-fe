import { REGEX } from "@/constants";
import { z } from "@/i18n";

export const signUpSchema = z.object({
    name: z.object({
        first: z.string().min(2).max(20),
        last: z.string().min(2).max(20),
    }),
    email: z.string().email(),
    password: z.string().regex(REGEX.password),
});
