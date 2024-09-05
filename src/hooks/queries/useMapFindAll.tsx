import { useQuery } from "@tanstack/react-query";

import { ApiMap } from "@/apis/map";
import { IMapFindAllPayload } from "@/types";

interface IProps {
    query: IMapFindAllPayload;
    enabled?: boolean;
}
export const useMapGetAll = ({ query, ...props }: IProps) =>
    useQuery({
        queryKey: ["findAllMap", query],
        queryFn: () => ApiMap.findAll(query),
        ...props,
    });
