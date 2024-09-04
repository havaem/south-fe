import { IMapObject } from "./type";

export const POLICE_STATION: IMapObject = {
    policeStation1: {
        resource: {
            id: "15_Police_Station",
            src: "/assets/maps/objects/15_Police_Station.png",
        },
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        body: {
            frameSize: {
                width: 21,
                height: 18,
            },
        },
        addOns: [
            {
                frameSize: {
                    width: 6,
                    height: 10,
                },
                offset: {
                    x: 0,
                    y: 68,
                },
                position: {
                    x: 9,
                    y: 9,
                },
                hFrames: 12,
                vFrames: 1,
                frame: 1,
                animations: {
                    base: {
                        duration: 2450,
                        frames: [
                            {
                                frame: 0,
                                time: 0,
                            },
                            {
                                frame: 1,
                                time: 150,
                            },
                            {
                                frame: 2,
                                time: 300,
                            },
                            {
                                frame: 3,
                                time: 450,
                            },
                            {
                                frame: 4,
                                time: 1050,
                            },
                            {
                                frame: 5,
                                time: 1200,
                            },
                            {
                                frame: 6,
                                time: 1350,
                            },
                            {
                                frame: 7,
                                time: 1500,
                            },
                            {
                                frame: 8,
                                time: 1650,
                            },
                            {
                                frame: 9,
                                time: 1800,
                            },
                            {
                                frame: 10,
                                time: 2400,
                            },
                            {
                                frame: 11,
                                time: 2450,
                            },
                        ],
                    },
                },
                zIndex: 2,
            },
            {
                frameSize: {
                    width: 6,
                    height: 10,
                },
                offset: {
                    x: 0,
                    y: 68,
                },
                position: {
                    x: 14,
                    y: 9,
                },
                hFrames: 12,
                vFrames: 1,
                frame: 11,
                animations: {
                    base: {
                        duration: 2450,
                        frames: [
                            {
                                frame: 0,
                                time: 0,
                            },
                            {
                                frame: 11,
                                time: 150,
                            },
                            {
                                frame: 10,
                                time: 300,
                            },
                            {
                                frame: 9,
                                time: 450,
                            },
                            {
                                frame: 8,
                                time: 1050,
                            },
                            {
                                frame: 7,
                                time: 1200,
                            },
                            {
                                frame: 6,
                                time: 1350,
                            },
                            {
                                frame: 5,
                                time: 1500,
                            },
                            {
                                frame: 4,
                                time: 1650,
                            },
                            {
                                frame: 3,
                                time: 1800,
                            },
                            {
                                frame: 2,
                                time: 2400,
                            },
                            {
                                frame: 1,
                                time: 2450,
                            },
                        ],
                    },
                },
                zIndex: 2,
            },
            {
                frameSize: {
                    width: 19,
                    height: 5,
                },
                offset: {
                    x: 32,
                    y: 0,
                },
                position: {
                    x: 0,
                    y: 0,
                },
                zIndex: 2,
            },
            {
                frameSize: {
                    width: 1,
                    height: 16,
                },
                offset: {
                    x: 32,
                    y: 6,
                },
                position: {
                    x: 0,
                    y: 1,
                },
                zIndex: 2,
            },
        ],
    },

    policeCar1: {
        resource: {
            id: "15_Police_Station",
            src: "/assets/maps/objects/15_Police_Station.png",
        },
        map: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        body: {
            frameSize: {
                width: 2,
                height: 5,
            },
            offset: {
                x: 21,
                y: 45,
            },
            position: {
                x: 20,
                y: 20,
            },
            hFrames: 2,
            frame: 0,
            animations: {
                base: {
                    duration: 300,
                    frames: [
                        {
                            frame: 0,
                            time: 0,
                        },
                        {
                            frame: 1,
                            time: 150,
                        },
                    ],
                },
            },
            zIndex: 2,
        },
        addOns: [],
    },
};
