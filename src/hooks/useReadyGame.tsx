import { useGameStore } from "@/stores";

import { useMapGetAll } from "./queries/useMapFindAll";

export const useReadyGame = () => {
    const { player } = useGameStore();

    const { data } = useMapGetAll({
        query: { name: "Welcome" },
    });
    const map = data?.data[0];

    return {
        map,
    };
};
