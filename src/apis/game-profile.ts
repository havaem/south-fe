import { get, patch } from "@/configs";
import { IGameProfile, IGameProfileUpdateCurrent, IGameProfileUpdateCurrentResponse } from "@/types";

const ENDPOINT = "/game-profile";
export const ApiGameProfile = {
    // getByUserId: (userId: string = "") => get<IProfile>(`${ENDPOINT}/${userId}`),
    current: (): Promise<IGameProfileUpdateCurrentResponse> => get<IGameProfile>(`${ENDPOINT}/current`),
    updateCurrent: (data: IGameProfileUpdateCurrent): Promise<IGameProfileUpdateCurrentResponse> =>
        patch(`${ENDPOINT}/current`, data),
};
