import { GameObject } from "@/games/cores/GameObject";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldMap } from "@/games/cores/WorldMap";

export class World {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    body: GameObject = new GameObject({
        position: new Vector2(0, 0),
    });
    map: WorldMap | null = null;
    isRunning: boolean = false;
    lastFrameTime: number = 0;
    accumulatedTime: number = 0;
    timeStep: number = 1000 / 60;
    rafId: number | null = null;

    currentHeroLocation = { x: 0, y: 0 };
    constructor({ canvas, ctx }: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    mainLoop = (timestamp: number) => {
        if (!this.isRunning) return;
        const deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;

        // Fixed time step updates.
        // If there's enough accumulated time to run one or more fixed updates, run them.
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // Here, we pass the fixed time step size.
            this.accumulatedTime -= this.timeStep;
        }

        // Render
        this.draw();
        this.rafId = requestAnimationFrame(this.mainLoop);
    };

    update = (delta: number) => {
        this.body.stepEntry(delta, this.body);
    };

    draw = () => {
        // Clear anything stale
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background
        this.ctx.fillStyle = "#e6feff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Save the current state (for camera offset)
        this.ctx.save();

        // Draw the map
        this.map?.drawLowerImage(this.ctx);
        // Draw objects in the mounted scene
        this.body.draw(this.ctx, 0, 0);

        this.map?.drawUpperImage(this.ctx);

        // Restore to original state
        this.ctx.restore();

        // Draw anything above the game world
        // inventory.draw(ctx, 0, 0);
    };

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}
