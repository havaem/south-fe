import { get } from "@/configs";
import { IProfile } from "@/types/models/profile";

const ENDPOINT = "/profile";
export const ApiProfile = {
    getCurrentUser: () => get<IProfile>(ENDPOINT),
};
