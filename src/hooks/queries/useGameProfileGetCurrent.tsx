import { useQuery } from "@tanstack/react-query";

import { ApiGameProfile } from "@/apis/game-profile";

interface IProps {
    enabled?: boolean;
}
export const useGameProfileGetCurrentUser = (props: IProps) =>
    useQuery({
        queryKey: ["gameProfileGetCurrentuser"],
        queryFn: ApiGameProfile.current,
        retry: 0,
        ...props,
    });
