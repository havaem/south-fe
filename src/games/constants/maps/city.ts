import { GameObject } from "@/games/cores/GameObject";

import { SPRITES } from "../../assets/sprites";
import { IWorldMapConfig } from "../../types";

export const CityMap: IWorldMapConfig = {
    world: this,
    lowerLayer: SPRITES.MAPS.CITY.lowerSrc,
    upperLayer: SPRITES.MAPS.CITY.upperSrc,
    walls: SPRITES.MAPS.CITY.map,
    gameObjects: new Map<string, GameObject>([
        // [
        //     OBJECT.HERO,
        //     new WorldObject({
        //         id: OBJECT.HERO,
        //         facingDirection: EDirection.DOWN,
        //         isPlayerControlled: true,
        //         position: {
        //             x: toGridSize(3),
        //             y: toGridSize(17),
        //         },
        //         body: new Sprite({
        //             resource: resources.images.heroScott,
        //             frameSize: new Vector2(toGridSize(1), toGridSize(2)),
        //             hFrames: 24,
        //             vFrames: 5,
        //             frame: 3,
        //             position: new Vector2(0, -20),
        //             animations: new Animation({
        //                 standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
        //                 standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
        //                 standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
        //                 standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
        //                 walkDown: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_DOWN),
        //                 walkUp: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_UP),
        //                 walkLeft: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_LEFT),
        //                 walkRight: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_RIGHT),
        //             }),
        //         }),
        //     }),
        // ],
    ]),
};
