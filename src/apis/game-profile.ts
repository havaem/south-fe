import { get } from "@/configs";
import { IGameProfile } from "@/types";

const ENDPOINT = "/game-profile";
export const ApiGameProfile = {
    // getByUserId: (userId: string = "") => get<IProfile>(`${ENDPOINT}/${userId}`),
    current: () => get<IGameProfile>(`${ENDPOINT}/current`),
};
