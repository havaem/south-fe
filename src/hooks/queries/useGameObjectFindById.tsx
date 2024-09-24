import { useQuery } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { TQueryConfig } from "@/types";

interface IProps {
    id: string;
    opts?: TQueryConfig<typeof ApiGameObject.findById>;
}
export const useGameObjectFindById = ({ id, opts }: IProps) =>
    useQuery({
        ...opts,
        queryKey: ["game-object", id],
        queryFn: () => ApiGameObject.findById(id),
    });
