import { useEffect } from "react";

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
    const { player } = useGameStore();

    const { data } = useMapGetAll({
        query: { name: "Welcome" },
    });
    const map = data?.data[0];

    useEffect(() => {
        if (isSuccess && dataGameProfile) {
            // const playerObject = new WorldObject({
            //     body: new Sprite({}),
            // });
        }
        return () => {};
    }, [isSuccess]);

    return {
        map,
    };
};
