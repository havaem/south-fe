import { useMutation } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

export const useSignIn = () =>
    useMutation({
        mutationFn: ApiAuth.login,
    });
