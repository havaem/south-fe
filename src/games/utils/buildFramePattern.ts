export const buildFramePattern = (frames: number, time: number, rootFrame = 0, reverse = false) => {
    if (reverse) {
        return {
            duration: time,
            frames: Array.from({ length: frames }, (_, i) => ({
                time: (time / frames) * i,
                frame: rootFrame + (frames - i - 1),
            })),
        };
    }

    return {
        duration: time,
        frames: Array.from({ length: frames }, (_, i) => ({
            time: (time / frames) * i,
            frame: rootFrame + i,
        })),
    };
};
