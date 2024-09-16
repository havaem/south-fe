import { useMutation } from "@tanstack/react-query";

import { ApiGameProfile } from "@/apis/game-profile";

export const useGameProfileUpdateCurrent = () =>
    useMutation({
        mutationFn: ApiGameProfile.updateCurrent,
    });
