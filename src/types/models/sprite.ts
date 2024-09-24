export interface ISprite {
    _id: string;
    resource: {
        _id: string;
        type: string;
        src: string;
    };
    name: string;
    position: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    frameSize: {
        x: number;
        y: number;
    };
    defaultFrame: number;
    verticalFrame: number;
    horizontalFrame: number;
    scale: number;
    animations: Array<{
        _id: string;
        name: string;
        duration: number;
        frames: Array<{
            time: number;
            frame: number;
        }>;
    }>;
}
