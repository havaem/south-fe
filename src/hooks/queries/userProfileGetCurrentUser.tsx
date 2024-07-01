import { useQuery } from "@tanstack/react-query";

import { ApiProfile } from "@/apis/profile";

interface IProps {
    enabled?: boolean;
}
export const useProfileGetCurrentUser = (props: IProps = {}) =>
    useQuery({
        queryKey: ["getProfileCurrentUSer"],
        queryFn: ApiProfile.getCurrentUser,
        ...props,
    });
