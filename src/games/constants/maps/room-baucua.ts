import { SPRITES } from "@/games/assets/sprites";
import { Animation } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { GameObject } from "@/games/cores/GameObject";
import { MapObject } from "@/games/cores/MapObject";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { IWorldMapConfig } from "@/games/types";
import { toGridSize } from "@/games/utils";
import { PERSON_ANIMATIONS } from "@/games/utils/personAnimation";

import { EDirection } from "../direction";
import { OBJECT } from "../object";
import { MAP_OBJECTS } from "./objects";

export const RoomBauCuaMap: IWorldMapConfig = {
    lowerSrc: SPRITES.MAPS.CITY.lowerSrc,
    upperSrc: SPRITES.MAPS.CITY.upperSrc,
    walls: SPRITES.MAPS.CITY.map,
    gameObjects: new Map<string, GameObject>([
        [
            "policeCar1",
            new MapObject({
                x: toGridSize(3),
                y: toGridSize(20),
                data: MAP_OBJECTS.POLICE_STATION.policeCar1,
            }),
        ],
        [
            "policeCar2",
            new MapObject({
                x: toGridSize(6),
                y: toGridSize(20),
                data: MAP_OBJECTS.POLICE_STATION.policeCar1,
            }),
        ],
        [
            OBJECT.AMELIA,
            new WorldObject({
                id: OBJECT.AMELIA,
                facingDirection: EDirection.LEFT,
                position: {
                    x: toGridSize(24),
                    y: toGridSize(30),
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
                talking: [],
            }),
        ],
        [
            OBJECT.HERO,
            new WorldObject({
                id: OBJECT.HERO,
                facingDirection: EDirection.UP,
                isPlayerControlled: true,
                position: {
                    x: toGridSize(23),
                    y: toGridSize(31),
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
    ]),
    cutsceneSpaces: {
        [`${toGridSize(23)},${toGridSize(30)}`]: [
            {
                events: [],
            },
        ],
    },
};
