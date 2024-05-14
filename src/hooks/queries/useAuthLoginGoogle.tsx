import { useMutation } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

export const useAuthLoginWithGoogle = () =>
    useMutation({
        mutationFn: ApiAuth.loginWithGoogle,
    });
