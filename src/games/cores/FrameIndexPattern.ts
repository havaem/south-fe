import { IAnimationConfig } from "../types";

export class FrameIndexPattern {
    currentTime: number;
    animationConfig: IAnimationConfig;
    duration: number;

    constructor(config: IAnimationConfig) {
        this.currentTime = 0;
        this.animationConfig = config;
        this.duration = config.duration ?? 500;
    }

    get frame() {
        const { frames } = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            }
        }
        return -1; // error
    }

    step(delta: number) {
        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}
