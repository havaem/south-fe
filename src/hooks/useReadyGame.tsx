import { useEffect } from "react";

import { queryClient } from "@/configs";
import { EEventName } from "@/games/constants/event";
import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { toGridSize } from "@/games/utils";
import { useGameStore } from "@/stores";

import { useGameObjectFindById } from "./queries/useGameObjectFindById";
import { useGameProfileGetCurrentUser } from "./queries/useGameProfileGetCurrent";
import { useMapGetAll } from "./queries/useMapFindAll";

export const useReadyGame = () => {
    const { data: dataGameProfile, isSuccess } = useGameProfileGetCurrentUser({});
    const { data: dataGameObject } = useGameObjectFindById({
        id: dataGameProfile?.data.hero ?? "",
        opts: { enabled: isSuccess },
    });

    const { player, setPlayer } = useGameStore();

    const { data } = useMapGetAll({
        query: { name: "Welcome" },
    });
    const map = data?.data[0];

    useEffect(() => {
        if (dataGameProfile && dataGameObject) {
            Object.values(dataGameObject.data.data).forEach((sprite) => {
                resources.pushImage(sprite.resource._id, sprite.resource.src);
            });

            const readyParts: {
                [key: string]: Sprite;
            } = {};
            Object.entries(dataGameObject.data.data).forEach(([key, value]) => {
                readyParts[key] = new Sprite({
                    resource: resources.images[value.resource._id],
                    frameSize: new Vector2(value.frameSize.x, value.frameSize.y),
                    hFrames: value.horizontalFrame,
                    vFrames: value.verticalFrame,
                    frame: value.defaultFrame,
                    position: new Vector2(value.position.x, value.position.y),
                    animations: new Animations(
                        Object.values(value.animations).reduce(
                            (acc, value) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                });
            });
            if (!player) {
                const playerObject = new WorldObject({
                    id: dataGameProfile.data._id,
                    position: new Vector2(toGridSize(4), toGridSize(6)),
                    ...readyParts,
                    isPlayerControlled: true,
                });
                setPlayer(playerObject);
            } else {
                console.log("readyParts: ", readyParts);
                player?.setAppearance(readyParts);
            }
        }
    }, [isSuccess, dataGameObject]);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.data.type === EEventName.INVALIDATE_QUERY) {
                queryClient.invalidateQueries(event.data.filters, event.data.options);
            }
        });
        return () => {};
    }, []);

    return {
        map,
        player,
    };
};
