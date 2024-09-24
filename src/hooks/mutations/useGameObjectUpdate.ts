import { useMutation } from "@tanstack/react-query";

import { ApiGameObject } from "@/apis";
import { IGameObjectUpdatePayload, TMutationConfig } from "@/types";

export const useGameObjectUpdate = ({ opts }: { opts?: TMutationConfig<typeof ApiGameObject.update> }) =>
    useMutation({
        ...opts,
        mutationFn: ({ id, data }: { id: string; data: IGameObjectUpdatePayload }) =>
            ApiGameObject.update({ id, data }),
    });
