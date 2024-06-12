import { z } from "zod";

const ApiErrorSchema = z.object({
    message: z.string().or(z.array(z.string())),
    statusCode: z.number(),
    path: z.string(),
    timestamp: z.string(),
});
type TApiError = z.infer<typeof ApiErrorSchema>;

export const isApiError = (error: unknown): error is TApiError => {
    try {
        ApiErrorSchema.parse(error);
        return true;
    } catch (error) {
        return false;
    }
};
