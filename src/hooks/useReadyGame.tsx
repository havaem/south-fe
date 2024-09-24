import { useEffect, useState } from "react";

import { queryClient } from "@/configs";
import { EMapName } from "@/games/constants";
import { EEventName } from "@/games/constants/event";
import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { useGameStore } from "@/stores";
import { IMap } from "@/types";
import { combineLoading } from "@/utils";

import { useGameObjectFindById } from "./queries/useGameObjectFindById";
import { useGameProfileGetCurrentUser } from "./queries/useGameProfileGetCurrent";
import { useMapGetAll } from "./queries/useMapFindAll";

export const useReadyGame = () => {
    const { data: dataGameProfile, isLoading: isLoadingGameProfile, isSuccess } = useGameProfileGetCurrentUser({});
    const { data: dataGameObject, isLoading: isLoadingGameObjectFindById } = useGameObjectFindById({
        id: dataGameProfile?.data.hero ?? "",
        opts: { enabled: isSuccess },
    });
    const { data: mapData, isLoading: isLoadingMapGetAll } = useMapGetAll({
        query: {},
    });

    const [currentMap, setCurrentMap] = useState<IMap>();

    const { player, setPlayer } = useGameStore();

    const isLoading = combineLoading(isLoadingGameProfile, isLoadingGameObjectFindById, isLoadingMapGetAll);

    useEffect(() => {
        if (dataGameProfile && dataGameObject && currentMap) {
            // ready resources for player
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
                //* if player not exists, create new player
                const playerObject = new WorldObject({
                    id: dataGameProfile.data._id,
                    position: new Vector2(currentMap.defaultPlayerPosition.x, currentMap.defaultPlayerPosition.y),
                    ...readyParts,
                    isPlayerControlled: true,
                });
                setPlayer(playerObject);
            } else {
                //* if player exists, set appearance for player
                player?.setAppearance(readyParts);
            }
        }
    }, [isSuccess, dataGameObject, currentMap]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === window.location.origin && event.data.type === EEventName.INVALIDATE_QUERY) {
                queryClient.invalidateQueries(event.data.filters, event.data.options);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    useEffect(() => {
        if (!dataGameObject?.data.data) return undefined;
        const length = Object.keys(dataGameObject.data.data).length;
        if (length > 1) {
            setCurrentMap(mapData?.data.find((map) => map.name === EMapName.CITY));
        } else {
            // if player has only one part, it means player is new player
            setCurrentMap(mapData?.data.find((map) => map.name === EMapName.WELCOME));
        }
    }, [mapData, dataGameObject]);

    return {
        map: currentMap,
        player,
        isLoading,
    };
};
