import { useQuery } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { ApiGameProfile } from "@/apis/game-profile";
import { TQueryConfig } from "@/types";

interface IProps {
    id: string;
    opts?: TQueryConfig<typeof ApiGameProfile.current>;
}
export const useGameObjectFindById = ({ id, opts }: IProps) =>
    useQuery({
        ...opts,
        queryKey: ["game-object", id],
        queryFn: () => ApiGameObject.findById(id),
    });
