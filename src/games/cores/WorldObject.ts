import { CONFIGS, EAnimation, EBehaviorType, EDirection, LAYER_INDEX, OBJECT_TYPE } from "../constants";
import { EEventName } from "../constants/event";
import { IBehavior, IBehaviorMove, IBehaviorStand, ITalkingBehavior } from "../types";
import { toGridSize } from "../utils";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import { KeyboardInput } from "./KeyboardInput";
import { NameTag } from "./NameTag";
import { resources } from "./Resource";
import { Sprite } from "./Sprite";
import { Vector2 } from "./Vector2";
import { WorldEvent } from "./WorldEvent";

enum NPCStatus {
    IDLE = 1,
    WALKING = 2,
}

export class WorldObject extends GameObject {
    //* 16 % speed === 0 is acceptable
    isPressedShift: boolean = false;
    speed: number = 1;
    directionUpdate: {
        [key in EDirection]: {
            offsetX: number;
            offsetY: number;
        };
    } = {
        [EDirection.UP]: {
            offsetX: 0,
            offsetY: -1,
        },
        [EDirection.DOWN]: {
            offsetX: 0,
            offsetY: 1,
        },
        [EDirection.LEFT]: {
            offsetX: -1,
            offsetY: 0,
        },
        [EDirection.RIGHT]: {
            offsetX: 1,
            offsetY: 0,
        },
    };
    facingDirection: EDirection = EDirection.DOWN;
    oldPosition: { x: number; y: number };
    lastX?: number;
    lastY?: number;
    //* Behavior
    movingRemaining = 0;
    behaviorIndex: number = 0;
    behaviorLoopArray: IBehavior[];
    talking: ITalkingBehavior[] = [];
    //* Status
    status: NPCStatus = NPCStatus.IDLE;
    //* Boolean
    isPlayerControlled: boolean = false;
    lastWalkingSuccess: boolean = true;
    hasArrived: boolean = true;
    showNameTag: boolean = false;
    //* Last pressed key
    lastPressedKey: number | null = null;

    //* Build
    body: Sprite;
    eyes?: Sprite;
    hairStyle?: Sprite;
    outfit?: Sprite;

    constructor(config: {
        id?: string;
        position: { x: number; y: number };

        body: Sprite;
        eyes?: Sprite;
        hairStyle?: Sprite;
        outfit?: Sprite;

        behaviorLoopArray?: IBehavior[];
        talking?: ITalkingBehavior[];
        facingDirection?: EDirection;
        isPlayerControlled?: boolean;
        showNameTag?: boolean;
        zIndex?: number;
    }) {
        const {
            id = "",
            position,

            body,
            eyes,
            hairStyle,
            outfit,

            behaviorLoopArray = [],
            talking = [],
            zIndex = LAYER_INDEX.LIVEABLE,
            facingDirection = EDirection.DOWN,
            isPlayerControlled = false,
            showNameTag,
        } = config;

        super({
            position: new Vector2(position.x, position.y),
            id,
            type: OBJECT_TYPE.WORLD_OBJECT,
        });

        this.behaviorLoopArray = behaviorLoopArray;

        this.oldPosition = { x: position.x, y: position.y };
        this.talking = talking;
        //* BODY BUILDER
        this.body = body;
        this.eyes = eyes;
        this.hairStyle = hairStyle;
        this.outfit = outfit;

        //* END BUILD
        this.facingDirection = facingDirection;
        this.isPlayerControlled = isPlayerControlled;
        this.showNameTag = showNameTag ?? this.showNameTag;
        this.zIndex = zIndex;

        this.initializeSprites();
    }

    ready(): void {
        const input = new KeyboardInput("Shift");
        input.init();
        this.input = input;
    }

    private initializeSprites() {
        //* SHADOW
        const shadow = new Sprite({
            resource: resources.images.shadowHero,
            frameSize: new Vector2(toGridSize(2), toGridSize(2)),
            position: new Vector2(-8, -18),
        });
        this.addChild(shadow);
        //* NAME TAG
        if (this.showNameTag)
            this.addChild(
                new NameTag({
                    position: new Vector2(8, -16),
                    text: this.id,
                }),
            );

        this.addChild(this.body);
        if (this.eyes) this.addChild(this.eyes);
        if (this.hairStyle) this.addChild(this.hairStyle);
        if (this.outfit) this.addChild(this.outfit);
    }

    //* map event ready
    mount() {
        //* add wall to person position
        if (!this.map) return;
        this.map?.addWall(this.position.x, this.position.y);

        setTimeout(() => {
            this.doBehaviorEvent();
        }, 10);
    }

    async doBehaviorEvent() {
        if (this.map?.isCutscenePlaying || this.behaviorLoopArray.length === 0) return;
        const eventConfig = this.behaviorLoopArray[this.behaviorIndex];
        if (!eventConfig || !this.map) return;

        eventConfig.id = this.id;

        const eventHandler = new WorldEvent({
            map: this.map,
            event: eventConfig,
        });

        await eventHandler.init();
        //* increase index
        this.nextBehavior();
        //* do next behavior
        this.doBehaviorEvent();
    }

    nextBehavior = () => {
        this.behaviorIndex = (this.behaviorIndex + 1) % this.behaviorLoopArray.length;
    };

    step(delta: number, root: GameObject) {
        //* Set speed
        if (this.isPlayerControlled) {
            this.isPressedShift = this.input?.isTriggerPressed ?? false;

            if (this.movingRemaining === 0) this.setSpeed(this.isPressedShift ? 2 : 1);
        }

        if (this.movingRemaining > 0) this.updatePosition();
        else {
            if (!this.map?.isCutscenePlaying && this.isPlayerControlled && root.input?.direction) {
                const currentTime = Date.now();
                if (this.lastPressedKey === null) {
                    if (this.movingRemaining <= 0) this.facingDirection = root.input.direction;
                    this.lastPressedKey = currentTime;
                } else if (currentTime - this.lastPressedKey >= 60) {
                    this.startBehavior({
                        type: EBehaviorType.MOVE,
                        direction: root.input.direction,
                    });
                }
            } else {
                this.lastPressedKey = null;
            }
        }
        this.updateSprite(root);
        if (this.isPlayerControlled) this.tryEmitPosition();
    }
    setSpeed(speed: number = 1) {
        this.speed = speed;
    }
    updateSprite(root: GameObject) {
        if (this.movingRemaining > 0) {
            if (this.facingDirection === EDirection.DOWN) {
                this.body.animations?.play(EAnimation.WALK_DOWN);
            }
            if (this.facingDirection === EDirection.UP) {
                this.body.animations?.play(EAnimation.WALK_UP);
            }
            if (this.facingDirection === EDirection.LEFT) {
                this.body.animations?.play(EAnimation.WALK_LEFT);
            }
            if (this.facingDirection === EDirection.RIGHT) {
                this.body.animations?.play(EAnimation.WALK_RIGHT);
            }
        } else {
            const { input } = root;
            if (input && !input.direction) {
                if (this.facingDirection === EDirection.LEFT) {
                    this.body.animations?.play(EAnimation.STAND_LEFT);
                }
                if (this.facingDirection === EDirection.RIGHT) {
                    this.body.animations?.play(EAnimation.STAND_RIGHT);
                }
                if (this.facingDirection === EDirection.UP) {
                    this.body.animations?.play(EAnimation.STAND_UP);
                }
                if (this.facingDirection === EDirection.DOWN) {
                    this.body.animations?.play(EAnimation.STAND_DOWN);
                }
                return;
            }
        }
    }

    updatePosition() {
        this.movingRemaining -= 1;

        const { nextX, nextY } = this.calculateNextPosition(this.facingDirection);

        this.position.x = nextX;
        this.position.y = nextY;

        if (this.movingRemaining === 0) {
            events.emit(EEventName.OBJECT_MOVE_COMPLETED, {
                whoId: this.id,
            });
        }
    }
    oppositeDirection(direction: EDirection) {
        if (direction === EDirection.DOWN) return EDirection.UP;
        if (direction === EDirection.UP) return EDirection.DOWN;
        if (direction === EDirection.LEFT) return EDirection.RIGHT;
        return EDirection.LEFT;
    }
    startBehavior(behavior: IBehaviorMove | IBehaviorStand) {
        this.facingDirection = behavior.direction;
        if (behavior.type === EBehaviorType.MOVE) {
            const nextPosition = this.calculateNextStep(this.facingDirection);
            if (!this.map?.isSpaceFree(nextPosition.nextX, nextPosition.nextY)) {
                if (behavior.isRetry)
                    setTimeout(() => {
                        this.startBehavior(behavior);
                    }, 2000);
                return;
            }
            this.map.moveWall(this.position.x, this.position.y, nextPosition.nextX, nextPosition.nextY);
            this.movingRemaining = CONFIGS.TILE_SIZE / this.speed;
        }
        if (behavior.type === EBehaviorType.STAND) {
            setTimeout(() => {
                events.emit(EEventName.OBJECT_STAND_COMPLETED, {
                    whoId: this.id,
                });
            }, behavior.duration);
        }
    }

    private tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;

        events.emit("HERO_POSITION", this.position);
    }

    private calculateNextPosition(direction: EDirection) {
        const nextX = this.directionUpdate[direction].offsetX * this.speed + this.position.x;
        const nextY = this.directionUpdate[direction].offsetY * this.speed + this.position.y;
        return { nextX, nextY };
    }

    calculateNextStep(direction: EDirection) {
        let nextX = this.position.x;
        let nextY = this.position.y;

        const gridSize = CONFIGS.TILE_SIZE;

        if (direction === EDirection.DOWN) {
            nextY += gridSize;
        }
        if (direction === EDirection.UP) {
            nextY -= gridSize;
        }
        if (direction === EDirection.LEFT) {
            nextX -= gridSize;
        }
        if (direction === EDirection.RIGHT) {
            nextX += gridSize;
        }

        return { nextX, nextY };
    }
}