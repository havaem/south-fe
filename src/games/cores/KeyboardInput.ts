import { EDirection } from "../constants";

export class KeyboardInput {
    keyTrigger?: string;
    keyTriggerPressed?: boolean = false;
    heldKeys: string[] = [];
    heldDirections: EDirection[] = [];

    constructor(keyTrigger?: string) {
        this.keyTrigger = keyTrigger;
    }

    init() {
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    get direction() {
        return this.heldDirections[0];
    }

    get key() {
        return this.heldKeys[0];
    }

    get isTriggerPressed() {
        return this.keyTriggerPressed ?? false;
    }

    handleKeyDown(event: KeyboardEvent) {
        const key = event.key;
        if (this.keyTrigger && key === this.keyTrigger) {
            this.keyTriggerPressed = true;
        }
        //* add key
        if (this.heldKeys.indexOf(key) === -1) this.heldKeys.push(key);

        //* add direction
        const direction = this.getDirectionByKey(key);
        if (direction && this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }

    handleKeyUp(event: KeyboardEvent) {
        const key = event.key;

        if (this.keyTrigger && key === this.keyTrigger) {
            this.keyTriggerPressed = false;
        }

        //* remove key
        const indexKey = this.heldKeys.indexOf(key);
        if (indexKey !== -1) {
            this.heldKeys.splice(indexKey, 1);
        }

        //* remove direction
        const direction = this.getDirectionByKey(key);
        if (!direction) return;
        const index = this.heldDirections.indexOf(direction);
        if (direction && index !== -1) {
            this.heldDirections.splice(index, 1);
        }
    }

    getDirectionByKey(key: string) {
        switch (key) {
            case "ArrowUp":
                return EDirection.UP;
            case "ArrowDown":
                return EDirection.DOWN;
            case "ArrowLeft":
                return EDirection.LEFT;
            case "ArrowRight":
                return EDirection.RIGHT;
            default:
                return null;
        }
    }

    destroy() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
        document.removeEventListener("keyup", this.handleKeyUp.bind(this));
    }
}
