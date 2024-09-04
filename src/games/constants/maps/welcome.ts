import { Animation } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { GameObject } from "@/games/cores/GameObject";
import { MapObject } from "@/games/cores/MapObject";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { toGridSize } from "@/games/utils";
import { PERSON_ANIMATIONS } from "@/games/utils/personAnimation";

import { SPRITES } from "../../assets/sprites";
import { IWorldMapConfig } from "../../types";
import { EBehaviorType } from "../behavior";
import { EDirection } from "../direction";
import { OBJECT } from "../object";
import { OTHERS } from "./objects/others";

export const WelcomeMap: IWorldMapConfig = {
    lowerSrc: SPRITES.MAPS.WELCOME.lowerSrc,
    upperSrc: "",
    walls: SPRITES.MAPS.WELCOME.map,
    cutsceneAtStart: [
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "Welcome to the world of South! \n Press Enter or Click to the message to continue.",
        // },
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "I'm Nam, the developer of this world.",
        // },
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "I'll guide you through the basics.",
        // },
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "Let's start with moving around. \n Use the arrow keys to move.",
        // },
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "Press E to interact with objects or people.",
        // },
        // {
        // 	type: EBehaviorType.MESSAGE,
        // 	message: "Let's talk to Amelia, the gỉrl above you.",
        // },
    ],
    gameObjects: new Map<string, GameObject>([
        [
            OBJECT.HERO,
            new WorldObject({
                id: OBJECT.HERO,
                facingDirection: EDirection.DOWN,
                isPlayerControlled: true,
                position: {
                    x: toGridSize(4),
                    y: toGridSize(6),
                },
                body: new Sprite({
                    resource: resources.images.heroScott,
                    frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                    hFrames: 24,
                    vFrames: 5,
                    frame: 3,
                    position: new Vector2(0, -20),
                    animations: new Animation({
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
            }),
        ],
        [
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
                    animations: new Animation({
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
        ],
    ]),
    cutsceneSpaces: {
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
    },
};
