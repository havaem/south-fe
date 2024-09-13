import { useEffect } from "react";

import { Animations } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { WorldObject } from "@/games/cores/WorldObject";
import { toGridSize } from "@/games/utils";
import { useGameStore } from "@/stores";

import { useSpriteFind } from "./queries";
import { useGameProfileGetCurrentUser } from "./queries/useGameProfileGetCurrent";
import { useMapGetAll } from "./queries/useMapFindAll";

export const useReadyGame = () => {
    const { data: dataGameProfile, isSuccess } = useGameProfileGetCurrentUser({});
    const { data: dataSprite } = useSpriteFind({
        id: dataGameProfile?.data.hero.data.body,
        opts: {
            enabled: isSuccess,
        },
    });
    const { player, setPlayer } = useGameStore();

    const { data } = useMapGetAll({
        query: { name: "Welcome" },
    });
    const map = data?.data[0];

    useEffect(() => {
        if (dataGameProfile && dataSprite) {
            const data = dataSprite.data;
            resources.pushImage(data.resource._id, data.resource.src);
            console.log(data.animations);
            const playerObject = new WorldObject({
                id: dataGameProfile.data._id,
                position: new Vector2(toGridSize(4), toGridSize(6)),
                body: new Sprite({
                    resource: resources.images[data.resource._id],
                    frameSize: new Vector2(data.frameSize.x, data.frameSize.y),
                    hFrames: data.horizontalFrame,
                    vFrames: data.verticalFrame,
                    frame: data.defaultFrame,
                    position: new Vector2(0, -20),
                    animations: new Animations(
                        Object.entries(data.animations).reduce(
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            (acc, [_, value]) => {
                                acc[value.name] = new FrameIndexPattern(value);
                                return acc;
                            },
                            {} as Record<string, FrameIndexPattern>,
                        ),
                    ),
                }),
                isPlayerControlled: true,
            });
            setPlayer(playerObject);
        }
        return () => {};
    }, [isSuccess, dataSprite]);

    return {
        map,
        player,
    };
};
