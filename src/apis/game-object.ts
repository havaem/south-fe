import { get, patch } from "@/configs";
import { IGameObject, IGameObjectUpdatePayload } from "@/types";

const ENDPOINT = "/game-object";
export const ApiGameObject = {
    // updateCurrent: (data: IGameObjectUpdateCurrent) => patch<IGameObject>(`${ENDPOINT}/current`, data),
    getById: (id: string) => get<IGameObject>(`${ENDPOINT}/${id}`),

    update: ({ id, data }: { id: string; data: IGameObjectUpdatePayload }): any => patch(`${ENDPOINT}/${id}`, data),
    updateCurrent: (data: IGameObjectUpdatePayload) => patch(`${ENDPOINT}/current`, data),
};
