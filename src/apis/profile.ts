import { get } from "@/configs";
import { IProfile } from "@/types/models/profile";

const ENDPOINT = "/profile";
export const ApiProfile = {
    getByUserId: (userId: string = "") => get<IProfile>(`${ENDPOINT}/${userId}`),
};
