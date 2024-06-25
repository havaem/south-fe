import { useQuery } from "@tanstack/react-query";

import { ApiPost } from "@/apis";

interface IProps {
    enabled?: boolean;
}
export const usePostGetAll = (props: IProps) =>
    useQuery({
        queryKey: ["getAllPost"],
        queryFn: ApiPost.getAll,
        ...props,
    });
