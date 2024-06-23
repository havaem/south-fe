import { post } from "@/configs";

const ENDPOINT = "/post";
export const ApiPost = {
    create: (data: FormData) => post(`${ENDPOINT}`, data),
};
