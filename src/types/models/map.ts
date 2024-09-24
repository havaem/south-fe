export interface IMap {
    _id: string;
    name: string;
    upperLayer: {
        _id: string;
        src: string;
    } | null;
    lowerLayer: {
        _id: string;
        src: string;
    };
    grid: number[][];
    defaultPlayerPosition: {
        x: number;
        y: number;
    };
    createdAt: string;
    updatedAt: string;
}
