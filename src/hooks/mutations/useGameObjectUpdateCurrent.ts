import { useMutation } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { IGameObjectUpdatePayload, TQueryConfig } from "@/types";

export const useGameObjectUpdateCurrent = ({ opts }: { opts?: TQueryConfig<typeof ApiGameObject.update> }) =>
    useMutation({
        ...opts,
        mutationFn: (data: IGameObjectUpdatePayload) => ApiGameObject.updateCurrent(data),
    });
