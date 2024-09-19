import { OBJECT_TYPE } from "../constants";
import { events } from "./Events";
import { KeyboardInput } from "./KeyboardInput";
import { Vector2 } from "./Vector2";
import { WorldMap } from "./WorldMap";

export class GameObject {
    id: string;
    //* Position in the world
    position: Vector2;
    //* Object
    parent: GameObject | null = null;
    map?: WorldMap;
    input?: KeyboardInput;
    type: OBJECT_TYPE;
    //* Children
    children: GameObject[] = [];
    //* Boolean
    hasReadyBeenCalled: boolean = false;
    zIndex: number = 0;
    constructor({
        position,
        id = "",
        zIndex = 0,
        type = OBJECT_TYPE.NORMAL,
    }: {
        position?: Vector2;
        id?: string;
        zIndex?: number;
        type?: OBJECT_TYPE;
    }) {
        this.position = position ?? new Vector2(0, 0);
        this.zIndex = zIndex;
        this.type = type;
        this.id = id;
    }

    // First entry point of the loop
    stepEntry(delta: number, root: GameObject) {
        // Call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        // Call ready on the first frame
        if (!this.hasReadyBeenCalled) {
            this.hasReadyBeenCalled = true;
            this.ready();
        }

        // Call any implemented Step code
        this.step(delta, root);
    }

    // Called before the first `step`
    ready() {
        // ...
    }

    // Called once every frame
    step(_delta: number, _root: GameObject) {
        // ...
    }

    /* draw entry */
    draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do the actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);

        // Pass on to children
        // sort by zIndex and y position
        this.reorderChildren();
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {
        //...
    }

    // Remove from the tree
    destroy() {
        this.children.forEach((child) => {
            child.destroy();
        });
        this.parent?.removeChild(this);
    }

    /* Other Game Objects are nestable inside this one */
    addChild(gameObject: GameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    changeZIndex(newZIndex: number) {
        this.zIndex = newZIndex;
        if (this.parent) {
            this.parent.reorderChildren();
        }
    }

    reorderChildren() {
        //sort by zIndex then sort by y position if type is world object
        this.children.sort((a, b) => {
            if (a.zIndex === b.zIndex) {
                if (a.type === OBJECT_TYPE.LIVEABLE && b.type === OBJECT_TYPE.LIVEABLE) {
                    return a.position.y - b.position.y;
                }
            }
            return a.zIndex - b.zIndex;
        });
    }

    removeChild(gameObject: GameObject) {
        events.unsubscribe(gameObject);
        this.children = this.children.filter((g) => {
            return gameObject !== g;
        });
    }
}
