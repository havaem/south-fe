import { EBehaviorType, EDirection } from "../constants";
import { GameObject } from "../cores/GameObject";
import { World } from "../cores/World";

export interface IBehaviorStand {
    type: EBehaviorType.STAND;
    direction: EDirection;
    duration: number;
    id?: string;
}
export interface IBehaviorMove {
    type: EBehaviorType.MOVE;
    direction: EDirection;
    isRetry?: boolean;
    id?: string;
}
export interface IBehaviorMessage {
    type: EBehaviorType.MESSAGE;
    message: string;
    id?: string;
}
export interface IBehaviorChangeMap {
    id: string;
    type: EBehaviorType.CHANGE_MAP;
}

export interface IBehaviorWallRemove {
    type: EBehaviorType.WALL_REMOVE;
    x: number;
    y: number;
    id?: string;
}
export interface IBehaviorRemoveObject {
    type: EBehaviorType.REMOVE_OBJECT;
    id?: string;
}
export interface IBehaviorAddObject {
    type: EBehaviorType.ADD_OBJECT;
    object: GameObject;
    id?: string;
}
export interface IBehaviorOpenIframe {
    type: EBehaviorType.OPEN_IFRAME;
    url: string;
    id?: string;
}

export type IBehavior =
    | IBehaviorMessage
    | IBehaviorStand
    | IBehaviorMove
    | IBehaviorChangeMap
    | IBehaviorWallRemove
    | IBehaviorRemoveObject
    | IBehaviorOpenIframe
    | IBehaviorAddObject;
export type ITalkingBehavior = {
    events: IBehavior[];
};

export type ICutsceneSpace = {
    [key: string]: [{ events: IBehavior[] }];
};
export type IWorldMapConfig = {
    playerId: string;
    world?: World;
    gameObjects: Map<string, GameObject>;
    lowerLayer: string;
    upperLayer?: string;
    walls: number[][];
    isCutscenePlaying?: boolean;
    cutsceneSpaces?: ICutsceneSpace;
    cutsceneAtStart?: IBehavior[];
};
export interface IAnimationConfig {
    duration?: number;
    frames: { time: number; frame: number }[];
}
export interface IMapObjectConfig {
    resource: {
        id: string;
        src: string;
    };
    map?: number[][];
    body: {
        id?: string;
        frameSize: {
            width: number;
            height: number;
        };
        hFrames?: number;
        vFrames?: number;
        frame?: number;
        scale?: number;
        position?: {
            x: number;
            y: number;
        };
        offset?: {
            x: number;
            y: number;
        };
        animations?: {
            [key: string]: IAnimationConfig;
        };
        zIndex?: number;
    };
    addOns?: {
        id?: string;
        frameSize: {
            width: number;
            height: number;
        };
        hFrames?: number;
        vFrames?: number;
        frame?: number;
        scale?: number;
        position?: {
            x: number;
            y: number;
        };
        offset?: {
            x: number;
            y: number;
        };
        animations?: {
            [key: string]: IAnimationConfig;
        };
        zIndex?: number;
    }[];
}
