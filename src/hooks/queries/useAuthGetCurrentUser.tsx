import { useQuery } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

interface IProps {
    enabled?: boolean;
}
export const useAuthGetCurrentUser = (props: IProps) =>
    useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: ApiAuth.getCurrentUser,
        retry: 0,
        ...props,
    });
