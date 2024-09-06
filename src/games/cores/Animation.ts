import { FrameIndexPattern } from "./FrameIndexPattern";

interface IAnimationConfig {
    [key: string]: FrameIndexPattern;
}

export class Animations {
    patterns: IAnimationConfig;
    activeKey: string;

    constructor(config: IAnimationConfig) {
        this.patterns = config;
        this.activeKey = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    play(key: string, startAtTime = 0) {
        // Already playing this one
        if (this.activeKey === key) {
            return;
        }
        // Switch
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    step(delta: number) {
        this.patterns[this.activeKey].step(delta);
    }
}
