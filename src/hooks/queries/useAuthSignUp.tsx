import { useMutation } from "@tanstack/react-query";

import { ApiAuth } from "@/apis";

export const useAuthSignUp = () =>
    useMutation({
        mutationFn: ApiAuth.register,
    });
