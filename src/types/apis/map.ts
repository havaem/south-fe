export interface IMapCreatePayload {
    name: string;
    upperLayer: string;
    lowerLayer: string;
    grid: number[][];
}
export interface IMapFindAllPayload extends Partial<IMapCreatePayload> {}

export interface IMapUpdatePayload extends Partial<IMapCreatePayload> {}
