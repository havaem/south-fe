import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

interface IProps extends Partial<Omit<UndefinedInitialDataOptions, "queryKey" | "queryFn">> {}
export const useAuthGetProfile = (props: IProps) =>
    useQuery({
        queryKey: ["getProfile"],
        queryFn: ApiAuth.getProfile,
        ...props,
    });
