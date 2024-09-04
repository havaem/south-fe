import { IMapObject } from "./type";

export const OTHERS: IMapObject = {
    markedLocation: {
        resource: {
            id: "markedLocation",
            src: "/assets/maps/others/marked-location.png",
        },
        body: {
            frameSize: {
                width: 1,
                height: 1,
            },
            hFrames: 3,
            animations: {
                base: {
                    frames: [
                        {
                            frame: 0,
                            time: 300,
                        },
                        {
                            frame: 1,
                            time: 600,
                        },
                        {
                            frame: 2,
                            time: 900,
                        },
                    ],
                    duration: 1500,
                },
            },
        },
        addOns: [],
    },
};
