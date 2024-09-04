import { useQuery } from "@tanstack/react-query";

import { ApiProfile } from "@/apis/profile";

interface IProps {
    userId?: string;
    enabled?: boolean;
}
export const useProfileGetByUserId = ({ userId, ...props }: IProps = {}) =>
    useQuery({
        queryKey: ["userProfileGetByUserId", userId ?? "currentUser"],
        queryFn: () => ApiProfile.getByUserId(userId),
        ...props,
    });
