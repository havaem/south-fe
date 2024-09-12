import { EEventName } from "../constants/event";
import { Camera } from "./Camera";
import { events } from "./Events";
import { GameObject } from "./GameObject";
import { KeyboardInput } from "./KeyboardInput";
import { KeyPressListener } from "./KeyPressListener";
import { soundManager } from "./Sound";
import { Vector2 } from "./Vector2";
import { WorldMap } from "./WorldMap";

export class World {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    body: GameObject = new GameObject({
        position: new Vector2(0, 0),
    });
    map: WorldMap | null = null;
    playerId: string | null = null;

    isRunning: boolean = false;
    lastFrameTime: number = 0;
    accumulatedTime: number = 0;
    timeStep: number = 1000 / 60;
    camera: Camera | null = null;
    rafId: number | null = null;

    currentHeroLocation = { x: 0, y: 0 };
    constructor({
        canvas,
        ctx,
        playerId,
    }: {
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        playerId: string;
    }) {
        this.playerId = playerId;

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

    bindActionInput() {
        new KeyPressListener("e", () => {
            this.map?.checkForActionCutscene();
        });
    }

    startMap(map: WorldMap) {
        //* remove all children of the body
        this.body.children = [];

        events.emit(EEventName.MAP_TRANSITION_START);
        // Stop the main loop if it's running
        if (this.isRunning) {
            this.stop();
        }

        // Clean up the previous map if it exists
        if (this.map) {
            this.map.cleanUp();
        }

        // Reset necessary states
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;

        // Initialize the new map
        this.map = map;
        this.map.world = this;

        this.map.mountObjects();

        this.start();
        events.emit(EEventName.MAP_TRANSITION_END);

        //* set isCutscenePlaying to true if there is a cutscene at the start
        if (this.map.cutsceneAtStart.length > 0) {
            this.map.isCutscenePlaying = true;
        }

        //* start the cutscene after 2 seconds
        setTimeout(() => {
            this.map?.startCutscene(this.map.cutsceneAtStart);
        }, 1000);

        //* Initialize the camera
        this.camera = new Camera();
        this.body.addChild(this.camera);
    }

    init({ map }: { map: WorldMap }) {
        this.startMap(map);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        const input = new KeyboardInput();
        input.init();
        this.body.input = input;

        soundManager.addSound("idle", "assets/sounds/idle.mp3");
        // soundManager.playSound("idle");
    }
    bindHeroPositionCheck() {
        events.on(EEventName.OBJECT_MOVE_COMPLETED, this, ({ whoId }: { whoId: string }) => {
            if (whoId === this.playerId) {
                this.map?.checkForFootstepCutscene();
            }
        });
    }

    update = (delta: number) => {
        this.body.stepEntry(delta, this.body);
    };

    draw = () => {
        // Clear anything stale
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background
        this.ctx.fillStyle = "#8a8b9f";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Save the current state (for camera offset)
        this.ctx.save();

        //Offset by camera position
        if (this.camera) this.ctx.translate(this.camera.position.x, this.camera.position.y);

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

        soundManager.stopSound();
    }
}
