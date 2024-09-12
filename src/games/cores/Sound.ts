export class SoundManager {
    private sounds: { [key: string]: Sound } = {};

    addSound(key: string, src: string): void {
        this.sounds[key] = new Sound(src);
    }

    playSound(key: string, onlyOne: boolean = false): void {
        const sound = this.sounds[key];

        if (onlyOne) {
            Object.values(this.sounds).forEach((s) => {
                s.stop();
            });
        }

        if (!sound) {
            throw new Error(`Sound with key ${key} not found`);
        }
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
        sound.stop();
    }

    setVolume(key: string, volume: number): void {
        const sound = this.sounds[key];
        if (!sound) {
            throw new Error(`Sound with key ${key} not found`);
        }
        sound.setVolume(volume);
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
}

export const soundManager = new SoundManager();
