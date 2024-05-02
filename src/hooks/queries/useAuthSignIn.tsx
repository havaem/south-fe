import { useMutation } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

export const useAuthSignIn = () =>
    useMutation({
        mutationFn: ApiAuth.login,
    });
