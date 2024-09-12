const makeStandingFrames = (rootFrame = 0) => {
    return {
        duration: 600 * 2,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 100 * 2,
                frame: rootFrame + 1,
            },
            {
                time: 200 * 2,
                frame: rootFrame + 2,
            },
            {
                time: 300 * 2,
                frame: rootFrame + 3,
            },
            {
                time: 400 * 2,
                frame: rootFrame + 4,
            },
            {
                time: 500 * 2,
                frame: rootFrame + 5,
            },
        ],
    };
};

const makeWalkingFrames = (rootFrame = 0) => {
    return {
        duration: 800,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            },
            {
                time: 100,
                frame: rootFrame + 1,
            },
            {
                time: 200,
                frame: rootFrame + 2,
            },
            {
                time: 300,
                frame: rootFrame + 3,
            },
            {
                time: 400,
                frame: rootFrame + 4,
            },
            {
                time: 500,
                frame: rootFrame + 5,
            },
        ],
    };
};

export const PERSON_ANIMATIONS = {
    STAND_DOWN: makeStandingFrames(46),
    STAND_RIGHT: makeStandingFrames(28),
    STAND_UP: makeStandingFrames(34),
    STAND_LEFT: makeStandingFrames(40),
    WALK_RIGHT: makeWalkingFrames(56),
    WALK_UP: makeWalkingFrames(62),
    WALK_LEFT: makeWalkingFrames(68),
    WALK_DOWN: makeWalkingFrames(74),
};
