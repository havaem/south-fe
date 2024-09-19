import { get, patch } from "@/configs";
import { IGameObjectUpdatePayload, IGameObjectUpdateResponse } from "@/types";

const ENDPOINT = "/game-object";
export const ApiGameObject = {
    // updateCurrent: (data: IGameObjectUpdateCurrent) => patch<IGameObject>(`${ENDPOINT}/current`, data),
    findById: (id: string): Promise<IGameObjectUpdateResponse> => get(`${ENDPOINT}/${id}`),

    update: ({ id, data }: { id: string; data: IGameObjectUpdatePayload }): Promise<IGameObjectUpdateResponse> =>
        patch(`${ENDPOINT}/${id}`, data),
    updateCurrent: (data: IGameObjectUpdatePayload): Promise<IGameObjectUpdateResponse> =>
        patch(`${ENDPOINT}/current`, data),
};
