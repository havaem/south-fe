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
