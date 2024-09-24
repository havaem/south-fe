import { useMutation } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { queryClient } from "@/configs";
import { IGameObjectUpdatePayload, TMutationConfig } from "@/types";
interface IProps {
    opts?: TMutationConfig<typeof ApiGameObject.updateCurrent>;
}
export const useGameObjectUpdateCurrent = ({ opts }: IProps) =>
    useMutation({
        ...opts,
        mutationFn: (data: IGameObjectUpdatePayload) => ApiGameObject.updateCurrent(data),
        onSuccess(data) {
            queryClient.refetchQueries({ queryKey: ["game-object", data.data._id] });
        },
    });
