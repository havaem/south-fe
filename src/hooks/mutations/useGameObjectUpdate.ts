import { useMutation } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { IGameObjectUpdatePayload, TQueryConfig } from "@/types";

export const useGameObjectUpdate = ({ opts }: { opts?: TQueryConfig<typeof ApiGameObject.update> }) =>
    useMutation({
        ...opts,
        mutationFn: ({ id, data }: { id: string; data: IGameObjectUpdatePayload }) =>
            ApiGameObject.update({ id, data }),
    });
