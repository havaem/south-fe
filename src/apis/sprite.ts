import { get } from "@/configs";
import { ISprite, ISpriteGetCharacterBuilderResponse } from "@/types";

const ENDPOINT = "/sprite";
export const ApiSprite = {
    // create: (data: IMapCreatePayload) => post<ISprite>(`${ENDPOINT}`, data),
    // findAll: (data?: IMapFindAllPayload) =>
    //     get<ISprite[]>(`${ENDPOINT}/`, {
    //         params: data,
    //     }),
    // update: (id: string, data: IMapUpdatePayload) => post<ISprite>(`${ENDPOINT}/${id}`, data),
    findById: (id: string) => get<ISprite>(`${ENDPOINT}/${id}`),
    // remove: (id:            string) => del<ISprite>(`${ENDPOINT}/${id}`),
    getCharacterBuilder: () => get<ISpriteGetCharacterBuilderResponse>(`${ENDPOINT}/character-builder`),
};
