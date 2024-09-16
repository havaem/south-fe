import { get, patch } from "@/configs";
import { IGameProfile, IGameProfileUpdateCurrent } from "@/types";

const ENDPOINT = "/game-profile";
export const ApiGameProfile = {
    // getByUserId: (userId: string = "") => get<IProfile>(`${ENDPOINT}/${userId}`),
    current: () => get<IGameProfile>(`${ENDPOINT}/current`),
    updateCurrent: (data: IGameProfileUpdateCurrent) => patch<IGameProfile>(`${ENDPOINT}/current`, data),
};
