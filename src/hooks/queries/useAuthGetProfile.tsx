import { useQuery } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

interface IProps {
    enabled?: boolean;
}
export const useAuthGetProfile = (props: IProps) =>
    useQuery({
        queryKey: ["getProfile"],
        queryFn: ApiAuth.getProfile,
        ...props,
    });
