import { OBJECT_TYPE } from "../constants";
import { IMapObjectConfig } from "../types";
import { buildMapBlock, toGridSize } from "../utils";
import { Animations } from "./Animation";
import { FrameIndexPattern } from "./FrameIndexPattern";
import { GameObject } from "./GameObject";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";

export class MapObject extends GameObject {
    name: string = "MapObject";
    body: Sprite;
    mapStructure: Set<string> = new Set();
    addOns: Sprite[] = [];
    constructor(config: { name?: string; x: number; y: number; data: IMapObjectConfig }) {
        const { x, y, data, name } = config;
        super({
            id: data.body.id,
            position: new Vector2(x, y),
            type: OBJECT_TYPE.MAP_OBJECT,
        });
        this.name = name ?? this.name;
        //* init resource
        resources.pushImage(data.resource.id, data.resource.src);

        this.body = new Sprite({
            resource: resources.images[data.resource.id],
            frameSize: new Vector2(toGridSize(data.body.frameSize.width), toGridSize(data.body.frameSize.height)),
            offset: data.body.offset
                ? new Vector2(toGridSize(data.body.offset.x), toGridSize(data.body.offset.y))
                : undefined,
            hFrames: data.body.hFrames,
            vFrames: data.body.vFrames,
            frame: data.body.frame,
            scale: data.body.scale,
            animations: data.body.animations
                ? new Animations(
                      Object.entries(data.body.animations).reduce(
                          (acc, [key, value]) => {
                              acc[key] = new FrameIndexPattern(value);
                              return acc;
                          },
                          {} as { [key: string]: FrameIndexPattern },
                      ),
                  )
                : undefined,
            zIndex: data.body.zIndex,
        });

        data.addOns?.forEach((addOn) => {
            this.addOns.push(
                new Sprite({
                    resource: resources.images[data.resource.id],
                    frameSize: new Vector2(toGridSize(addOn.frameSize.width), toGridSize(addOn.frameSize.height)),
                    position: addOn.position
                        ? new Vector2(x + toGridSize(addOn.position.x), y + toGridSize(+addOn.position.y))
                        : undefined,
                    offset: addOn.offset
                        ? new Vector2(toGridSize(addOn.offset.x), toGridSize(addOn.offset.y))
                        : undefined,
                    hFrames: addOn.hFrames,
                    vFrames: addOn.vFrames,
                    frame: addOn.frame,
                    scale: addOn.scale,
                    animations: addOn.animations
                        ? new Animations(
                              Object.entries(addOn.animations).reduce(
                                  (acc, [key, value]) => {
                                      acc[key] = new FrameIndexPattern(value);
                                      return acc;
                                  },
                                  {} as { [key: string]: FrameIndexPattern },
                              ),
                          )
                        : undefined,
                    zIndex: addOn.zIndex,
                }),
            );
        });

        //* add wall to map
        this.mapStructure = buildMapBlock(data.map ?? [], {
            x: y,
            y: x,
        });
    }

    ready(): void {
        //* add map wall
        this.map?.addMapWithSet(this.mapStructure);
        this.addChild(this.body);
        this.addOns.forEach((addOn) => {
            this.parent?.addChild(addOn);
        });
    }
}
