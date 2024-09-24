import { useQuery } from "@tanstack/react-query";

import { ApiGameProfile } from "@/apis/game-profile";
import { TQueryConfig } from "@/types";

interface IProps {
    opts?: TQueryConfig<typeof ApiGameProfile.current>;
}
export const useGameProfileGetCurrentUser = (props: IProps) =>
    useQuery({
        ...props.opts,
        queryKey: ["gameProfileGetCurrentuser"],
        queryFn: ApiGameProfile.current,
        retry: 0,
    });
