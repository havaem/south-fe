export class SoundManager {
    currentSound: Sound | null = null;
    volume: number = 1;
    private sounds: { [key: string]: Sound } = {};

    addSound(key: string, src: string): void {
        this.sounds[key] = new Sound(src);
    }

    playSound(key: string, onlyOne: boolean = false, loop = false): void {
        const sound = this.sounds[key];

        if (onlyOne) {
            Object.values(this.sounds).forEach((s) => {
                s.stop();
            });
        }

        if (!sound) {
            throw new Error(`Sound with key ${key} not found`);
        }
        sound.setLoop(loop);

        this.currentSound = sound;
        sound.play();
    }

    pauseSound(key: string): void {
        const sound = this.sounds[key];
        if (!sound) {
            throw new Error(`Sound with key ${key} not found`);
        }
        sound.pause();
    }

    stopSound(key?: string): void {
        if (!key) {
            Object.values(this.sounds).forEach((s) => {
                s.stop();
            });
            return;
        }

        const sound = this.sounds[key];
        if (!sound) {
            throw new Error(`Sound with key ${key} not found`);
        }

        this.currentSound = null;
        sound.stop();
    }

    setVolume(volume: number): void {
        Object.values(this.sounds).forEach((sound) => {
            sound.setVolume(volume);
        });
        this.volume = volume;
    }
}

export class Sound {
    private audio: HTMLAudioElement;
    duration: number = 0;

    constructor(src: string) {
        this.audio = new Audio(src);
        this.duration = this.audio.duration;
    }

    play(): void {
        this.audio.play();
    }

    pause(): void {
        this.audio.pause();
    }

    stop(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    setVolume(volume: number): void {
        if (volume < 0 || volume > 1) {
            throw new Error("Volume must be between 0.0 and 1.0");
        }
        this.audio.volume = volume;
    }
    setLoop(loop: boolean): void {
        this.audio.loop = loop;
    }
}

export const soundManager = new SoundManager();
