import { ISprite } from "../models";
import { EResourceType } from "../models/resource";

export interface ISpriteGetCharacterBuilderResponse {
    [EResourceType.CHARACTER_ACCESSORY]: ISprite[];
    [EResourceType.CHARACTER_BODY]: ISprite[];
    [EResourceType.CHARACTER_EYES]: ISprite[];
    [EResourceType.CHARACTER_HAIR]: ISprite[];
    [EResourceType.CHARACTER_OUTFIT]: ISprite[];
}
