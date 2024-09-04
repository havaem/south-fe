import { GameObject } from "@/games/cores/GameObject";

import { SPRITES } from "../../assets/sprites";
import { Animation } from "../../cores/Animation";
import { FrameIndexPattern } from "../../cores/FrameIndexPattern";
import { resources } from "../../cores/Resource";
import { Sprite } from "../../cores/Sprite";
import { Vector2 } from "../../cores/Vector2";
import { WorldObject } from "../../cores/WorldObject";
import { IWorldMapConfig } from "../../types";
import { toGridSize } from "../../utils";
import { PERSON_ANIMATIONS } from "../../utils/personAnimation";
import { EDirection } from "../direction";
import { OBJECT } from "../object";

export const CityMap: IWorldMapConfig = {
    world: this,
    lowerSrc: SPRITES.MAPS.CITY.lowerSrc,
    upperSrc: SPRITES.MAPS.CITY.upperSrc,
    walls: SPRITES.MAPS.CITY.map,
    gameObjects: new Map<string, GameObject>([
        [
            OBJECT.HERO,
            new WorldObject({
                id: OBJECT.HERO,
                facingDirection: EDirection.DOWN,
                isPlayerControlled: true,
                position: {
                    x: toGridSize(3),
                    y: toGridSize(17),
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
};
