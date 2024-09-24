import { OBJECT_TYPE } from "@/games/constants";

import { ISprite } from "./sprite";

export interface IGameObject {
    _id: string;
    name: string;
    type: OBJECT_TYPE;
    position: {
        x: number;
        y: number;
    };
    index: number;
    data: {
        body?: ISprite;
        eye?: ISprite;
        hair?: ISprite;
        outfit?: ISprite;
    };
}
