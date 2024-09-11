import { EMapType, OBJECT } from "../constants";
import { IBehavior, ICutsceneSpace, IWorldMapConfig } from "../types";
import { buildMapBlock } from "../utils";
import { GameObject } from "./GameObject";
import { World } from "./World";
import { WorldEvent } from "./WorldEvent";
import { WorldObject } from "./WorldObject";

export class WorldMap {
    world?: World;
    gameObjects: Map<string, GameObject>;
    lowerImage: HTMLImageElement;
    upperImage: HTMLImageElement | null = null;
    walls: Set<string> = new Set();
    isCutscenePlaying: boolean;
    cutsceneSpaces: ICutsceneSpace;
    cutsceneAtStart: IBehavior[];
    upperGameObjects: GameObject[] = [];
    constructor(config: IWorldMapConfig) {
        this.world = config.world;

        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerLayer;

        if (config.upperLayer) {
            this.upperImage = new Image();
            this.upperImage.src = config.upperLayer;
        }

        this.cutsceneSpaces = config.cutsceneSpaces ?? {};
        this.isCutscenePlaying = config.isCutscenePlaying ?? false;
        this.cutsceneAtStart = config.cutsceneAtStart ?? [];

        this.walls = buildMapBlock(config.walls);
    }

    drawLowerImage(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx: CanvasRenderingContext2D) {
        //* Draw walls
        this.drawWallBlock(ctx);
        if (!this.upperImage) return;
        ctx.drawImage(this.upperImage, 0, 0);
        //* Draw grid
        // drawGrid(ctx, CONFIGS.WIDTH, CONFIGS.HEIGHT, CONFIGS.TILE_SIZE, SPRITES.MAPS.CITY.map);
    }
    drawWallBlock(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        this.walls.forEach((wall) => {
            const [type, position] = wall.split("-");
            if (+type !== EMapType.WALL) return;
            const [x, y] = position.split(",").map((n) => parseInt(n));

            ctx.fillRect(x, y, 16, 16);
        });
    }
    addUpperObject(gameObject: GameObject) {
        this.upperGameObjects.push(gameObject);
    }
    drawUpperObjects(ctx: CanvasRenderingContext2D) {
        this.upperGameObjects.sort((a, b) => a.zIndex - b.zIndex || a.position.y - b.position.y);
        this.upperGameObjects.forEach((gameObject) => {
            gameObject.draw(ctx, gameObject.position.x, gameObject.position.y);
        });
    }

    mountObjects() {
        this.gameObjects.forEach((gameObject) => {
            gameObject.map = this;

            if (gameObject instanceof WorldObject) {
                gameObject.mount();
            }

            this.world?.body.addChild(gameObject);
        });
    }

    isSpaceFree(x: number, y: number) {
        return !this.walls.has(`${EMapType.WALL}-${x},${y}`);
    }

    async startCutscene(events: IBehavior[]) {
        this.isCutscenePlaying = true;
        //* loop event
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const eventHandler = new WorldEvent({
                map: this,
                event,
            });
            await eventHandler.init();
        }

        this.gameObjects.forEach((gameObject) => {
            if (gameObject instanceof WorldObject) gameObject.doBehaviorEvent();
        });
        this.isCutscenePlaying = false;
    }

    checkForActionCutscene() {
        if (this.gameObjects.get(OBJECT.HERO)) {
            const hero = this.gameObjects.get(OBJECT.HERO) as WorldObject;

            const nextPosition = hero.calculateNextStep(hero.facingDirection);

            this.gameObjects.forEach((gameObject) => {
                if (gameObject instanceof WorldObject) {
                    const { x, y } = gameObject.position;
                    if (x === nextPosition.nextX && y === nextPosition.nextY) {
                        if (!this.isCutscenePlaying && gameObject.talking.length) {
                            this.startCutscene(gameObject.talking[0].events);
                        }
                    }
                }
            });
        }
    }
    checkForFootstepCutscene() {
        const hero = this.gameObjects.get(OBJECT.HERO) as WorldObject;
        if (!hero) return;

        const match = this.cutsceneSpaces[`${hero.position.x},${hero.position.y}`];

        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events);
        }
    }
    addWall(x: number, y: number) {
        this.walls.add(`${EMapType.WALL}-${x},${y}`);
    }
    removeWall(x: number, y: number) {
        this.walls.delete(`${EMapType.WALL}-${x},${y}`);
    }
    moveWall(x: number, y: number, newX: number, newY: number) {
        this.removeWall(x, y);
        this.addWall(newX, newY);
    }
    addMapWithSet(map: Set<string>) {
        map.forEach((wall) => {
            this.walls.add(wall);
        });
    }

    cleanUp() {
        this.walls.clear();
        this.gameObjects = new Map();
        this.lowerImage = new Image();
        this.upperImage = new Image();
        this.isCutscenePlaying = false;
        this.cutsceneSpaces = {};
    }
}
