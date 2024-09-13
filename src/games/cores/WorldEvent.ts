import { EBehaviorType, OBJECT } from "../constants";
import { EEventName } from "../constants/event";
import {
    IBehavior,
    IBehaviorAddObject,
    IBehaviorChangeMap,
    IBehaviorMessage,
    IBehaviorMove,
    IBehaviorOpenIframe,
    IBehaviorRemoveObject,
    IBehaviorStand,
    IBehaviorWallRemove,
} from "../types";
import { events } from "./Events";
import { TextMessage } from "./TextMessage";
import { WorldMap } from "./WorldMap";
import { WorldObject } from "./WorldObject";

export class WorldEvent {
    map: WorldMap;
    event: IBehavior;
    constructor({ map, event }: { map: WorldMap; event: IBehavior }) {
        this.map = map;
        this.event = event;
    }

    stand(resolve: Function) {
        const event = this.event as IBehaviorStand;
        if (!event.id) return;
        const who = this.map.gameObjects.get(event.id) as WorldObject;
        if (!who) return;

        who.startBehavior({
            type: EBehaviorType.STAND,
            direction: event.direction,
            duration: event.duration,
        });
        events.on(EEventName.OBJECT_STAND_COMPLETED, this, ({ whoId }: { whoId: string }) => {
            if (whoId === who.id) {
                resolve();
            }
        });
    }
    move(resolve: Function) {
        const event = this.event as IBehaviorMove;
        if (!event.id) return;
        const who = this.map.gameObjects.get(event.id) as WorldObject;
        if (!who) return;

        who.startBehavior({
            type: EBehaviorType.WALK,
            direction: event.direction,
            isRetry: true,
        });
        events.on(EEventName.OBJECT_MOVE_COMPLETED, this, ({ whoId }: { whoId: string }) => {
            if (whoId === who.id) {
                resolve();
            }
        });
    }

    textMessage(resolve: Function) {
        const event = this.event as IBehaviorMessage;

        if (event.id) {
            const who = this.map.gameObjects.get(event.id) as WorldObject;
            const hero = this.map.gameObjects.get(OBJECT.HERO) as WorldObject;
            if (!who) return;
            const newDirection = who.oppositeDirection(hero.facingDirection);

            who.startBehavior({
                type: EBehaviorType.STAND,
                direction: newDirection,
                duration: 0,
            });
        }

        const message = new TextMessage({
            speaker: event.id,
            text: event.message,
            onComplete: () => resolve(),
        });
        events.emit(EEventName.MESSAGE, message);
    }

    changeMap(resolve: Function) {
        Object.values(this.map.gameObjects).forEach((obj) => {
            obj.destroy();
        });

        const event = this.event as IBehaviorChangeMap;
        // this.map.world?.startMap(MAPS[event.id]);
        resolve();
    }
    wallRemove(resolve: Function) {
        const event = this.event as IBehaviorWallRemove;
        this.map.removeWall(event.x, event.y);
        resolve();
    }

    addObject(resolve: Function) {
        const event = this.event as IBehaviorAddObject;

        if (!this.map.world) {
            resolve();
        }

        this.map.world?.body.addChild(event.object);
        resolve();
    }

    removeObject(resolve: Function) {
        const event = this.event as IBehaviorRemoveObject;
        if (!this.map.world) {
            resolve();
        }

        const object = this.map.world?.body.children.find((child) => {
            return child.id === event.id;
        });
        if (object) {
            //* remove wall if the object is a wall
            this.map.removeWall(object.position.x, object.position.y);
            //* remove the object from the world
            this.map.world?.body.removeChild(object);
        }
        resolve();
    }

    openIframe(resolve: Function) {
        const event = this.event as IBehaviorOpenIframe;
        events.emit(EEventName.OPEN_IFRAME, {
            url: event.url,
            resolve,
        });
    }

    init() {
        return new Promise((resolve) => {
            switch (this.event.type) {
                case EBehaviorType.STAND:
                    this.stand(resolve);
                    break;
                case EBehaviorType.WALK:
                    this.move(resolve);
                    break;
                case EBehaviorType.MESSAGE:
                    this.textMessage(resolve);
                    break;
                case EBehaviorType.CHANGE_MAP:
                    this.changeMap(resolve);
                    break;
                case EBehaviorType.WALL_REMOVE:
                    this.wallRemove(resolve);
                    break;
                case EBehaviorType.ADD_OBJECT:
                    this.addObject(resolve);
                    break;
                case EBehaviorType.REMOVE_OBJECT:
                    this.removeObject(resolve);
                    break;
                case EBehaviorType.OPEN_IFRAME:
                    this.openIframe(resolve);
                    break;
                default:
                    break;
            }
        });
    }
}
