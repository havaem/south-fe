import { IMap } from "@/types";

import { EBehaviorType, EDirection, EMapType, OBJECT } from "../constants";
import { OTHERS } from "../constants/maps/objects/others";
import { Animations } from "../cores/Animation";
import { FrameIndexPattern } from "../cores/FrameIndexPattern";
import { GameObject } from "../cores/GameObject";
import { MapObject } from "../cores/MapObject";
import { resources } from "../cores/Resource";
import { Sprite } from "../cores/Sprite";
import { Vector2 } from "../cores/Vector2";
import { WorldMap } from "../cores/WorldMap";
import { WorldObject } from "../cores/WorldObject";
import { IBehavior, ICutsceneSpace } from "../types";
import { PERSON_ANIMATIONS } from "./personAnimation";
import { toGridSize } from "./toGridSize";

interface IBuildMapProps {
    name?: string;
    map: IMap;
    player: GameObject;
}
export const buildMap = ({ name, map, player }: IBuildMapProps): WorldMap => {
    let cutsceneAtStart: IBehavior[] | undefined = undefined;
    let cutsceneSpaces: ICutsceneSpace | undefined = undefined;
    const gameObjects = new Map<string, GameObject>();

    switch (name) {
        case "Welcome":
            cutsceneAtStart = [
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "Welcome to the world of South! \n Press Enter or Click to the message to continue.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "I'm Nam, the developer of this world.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "I'll guide you through the basics.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "Let's start with moving around. \n Use the arrow keys to move.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "Press E to interact with objects or people.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "Let's talk to Amelia, the gỉrl above you.",
                // },
            ];
            cutsceneSpaces = {
                [`${toGridSize(4)},${toGridSize(10)}`]: [
                    {
                        events: [
                            {
                                type: EBehaviorType.CHANGE_MAP,
                                id: "CityMap",
                            },
                        ],
                    },
                ],
            };
            gameObjects.set(
                OBJECT.AMELIA,
                new WorldObject({
                    id: OBJECT.AMELIA,
                    facingDirection: EDirection.DOWN,
                    position: {
                        x: toGridSize(3),
                        y: toGridSize(2),
                    },
                    body: new Sprite({
                        resource: resources.images.heroAmelia,
                        frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                        hFrames: 24,
                        vFrames: 5,
                        frame: 3,
                        position: new Vector2(0, -20),
                        animations: new Animations({
                            standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                            standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                            standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                            standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                            walkDown: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_DOWN),
                            walkUp: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_UP),
                            walkLeft: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_LEFT),
                            walkRight: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_RIGHT),
                        }),
                    }),
                    behaviorLoopArray: [],
                    talking: [
                        {
                            events: [
                                {
                                    type: EBehaviorType.MESSAGE,
                                    message: "Hi! I'm Amelia. Nice to meet you!",
                                },
                                {
                                    type: EBehaviorType.MESSAGE,
                                    message: "I'm here to help you get started.",
                                },
                                {
                                    type: EBehaviorType.ADD_OBJECT,
                                    object: new MapObject({
                                        x: toGridSize(4),
                                        y: toGridSize(10),
                                        data: OTHERS.markedLocation,
                                    }),
                                },
                                {
                                    type: EBehaviorType.MESSAGE,
                                    message:
                                        "Do you see the marked position? \n Follow me and you will officially become a resident of this city.",
                                },
                                {
                                    type: EBehaviorType.WALL_REMOVE,
                                    x: toGridSize(4),
                                    y: toGridSize(10),
                                },
                                {
                                    id: OBJECT.HERO,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.LEFT,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.RIGHT,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.MOVE,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.STAND,
                                    direction: EDirection.DOWN,
                                    duration: 1000,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.REMOVE_OBJECT,
                                },
                            ],
                        },
                    ],
                }),
            );
            break;

        default:
            break;
    }

    return new WorldMap({
        lowerLayer: map.lowerLayer.src,
        upperLayer: map.upperLayer?.src,
        walls: map.grid,
        gameObjects: new Map<string, GameObject>([[OBJECT.HERO, player], ...gameObjects]),
        cutsceneAtStart,
        cutsceneSpaces,
    });
};

export const buildMapBlock = (walls: number[][], offset = { x: 0, y: 0 }) => {
    const mapSet = new Set<string>();

    for (let i = 0; i < walls.length; i++) {
        for (let j = 0; j < walls[i].length; j++) {
            //* WALL 0
            if (walls[i][j] === 0) {
                mapSet.add(`${EMapType.WALL}-${toGridSize(j) + offset.y},${toGridSize(i) + offset.x}`);
            }
        }
    }

    return mapSet;
};
