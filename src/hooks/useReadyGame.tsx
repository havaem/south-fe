import { useMapGetAll } from "./queries/useMapFindAll";

export const useReadyGame = () => {
    const { data } = useMapGetAll({
        query: { name: "Welcome" },
    });
    const map = data?.data[0];

    return {
        map,
    };
};
