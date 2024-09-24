export enum EResourceType {
    MAP_LOWER = "MAP_LOWER",
    MAP_UPPER = "MAP_UPPER",

    CHARACTER_BODY = "CHARACTER_BODY",
    CHARACTER_EYES = "CHARACTER_EYES",
    CHARACTER_OUTFIT = "CHARACTER_OUTFIT",
    CHARACTER_HAIR = "CHARACTER_HAIR",
    CHARACTER_ACCESSORY = "CHARACTER_ACCESSORY",
}
export interface IResource {
    _id: string;
    type: EResourceType;
    src: string;
    createdAt: string;
    updatedAt: string;
}
