import { APP_PATH } from "@/constants";
import { IMap } from "@/types";

import { EAnimation, EBehaviorType, EDirection, EMapType, OBJECT } from "../constants";
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
                //     message: "I'm Nam, who developed of this world.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "I'll guide you through the basics.",
                // },
                // {
                //     type: EBehaviorType.MESSAGE,
                //     message: "Let's start with moving around. \n Use the arrow keys to move, E to interact.",
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
                        hFrames: 28,
                        vFrames: 20,
                        frame: 1,
                        position: new Vector2(0, -20),
                        animations: new Animations({
                            [EAnimation.STAND_DOWN]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                            [EAnimation.STAND_UP]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                            [EAnimation.STAND_LEFT]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                            [EAnimation.STAND_RIGHT]: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                            [EAnimation.WALK_DOWN]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_DOWN),
                            [EAnimation.WALK_UP]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_UP),
                            [EAnimation.WALK_LEFT]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_LEFT),
                            [EAnimation.WALK_RIGHT]: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_RIGHT),
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
                                    type: EBehaviorType.MESSAGE,
                                    message: "Let's change the appearance of your character.",
                                },
                                {
                                    type: EBehaviorType.OPEN_IFRAME,
                                    url: APP_PATH.HEAVEN.CHARACTER_BUILDER,
                                },
                                {
                                    id: player.id,
                                    type: EBehaviorType.STAND,
                                    direction: EDirection.UP,
                                    duration: 1000,
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
                                    message: "You look great! \n Do you see the marked location on the map?",
                                },
                                {
                                    id: player.id,
                                    type: EBehaviorType.STAND,
                                    direction: EDirection.DOWN,
                                    duration: 1000,
                                },
                                {
                                    id: player.id,
                                    type: EBehaviorType.STAND,
                                    direction: EDirection.UP,
                                    duration: 1000,
                                },
                                {
                                    type: EBehaviorType.MESSAGE,
                                    message: "Let's go there!",
                                },

                                {
                                    type: EBehaviorType.WALL_REMOVE,
                                    x: toGridSize(4),
                                    y: toGridSize(10),
                                },
                                {
                                    id: player.id,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.LEFT,
                                },
                                {
                                    id: player.id,
                                    type: EBehaviorType.STAND,
                                    direction: EDirection.DOWN,
                                    duration: 500,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.DOWN,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
                                    direction: EDirection.RIGHT,
                                },
                                {
                                    id: OBJECT.AMELIA,
                                    type: EBehaviorType.WALK,
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
        playerId: player.id,
        lowerLayer: map.lowerLayer.src,
        upperLayer: map.upperLayer?.src,
        walls: map.grid,
        gameObjects: new Map<string, GameObject>([[player.id, player], ...gameObjects]),
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
