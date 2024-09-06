import { CONFIGS } from "../constants/configs";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
    constructor() {
        super({
            id: "camera",
        });

        events.on("HERO_POSITION", this, (heroPosition: Vector2) => {
            // Create a new position based on the hero's position
            const personHalf = 8;
            const canvasWidth = CONFIGS.WIDTH;
            const canvasHeight = CONFIGS.HEIGHT;
            const halfWidth = -personHalf + canvasWidth / 2;
            const halfHeight = -personHalf + canvasHeight / 2;

            this.position = new Vector2(-heroPosition.x + halfWidth, -heroPosition.y + halfHeight);
            // console.log(heroPosition.x / 16, heroPosition.y / 16);
        });
    }
}
