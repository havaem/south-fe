import { get, post } from "@/configs";
import { IPost } from "@/types";

const ENDPOINT = "/post";
export const ApiPost = {
    create: (data: FormData) => post(`${ENDPOINT}`, data),
    getAll: () => get<IPost[]>(`${ENDPOINT}/`),
};
