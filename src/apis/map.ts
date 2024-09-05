import { del, get, post } from "@/configs";
import { IMap, IMapCreatePayload, IMapFindAllPayload, IMapUpdatePayload } from "@/types";

const ENDPOINT = "/map";
export const ApiMap = {
    create: (data: IMapCreatePayload) => post<IMap>(`${ENDPOINT}`, data),
    findAll: (data?: IMapFindAllPayload) =>
        get<IMap[]>(`${ENDPOINT}/`, {
            params: data,
        }),
    update: (id: string, data: IMapUpdatePayload) => post<IMap>(`${ENDPOINT}/${id}`, data),
    find: (id: string) => get<IMap>(`${ENDPOINT}/${id}`),
    remove: (id: string) => del<IMap>(`${ENDPOINT}/${id}`),
};
