/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { ApiPost } from "@/apis";
import { useToast } from "@/components/ui/use-toast";
import { isApiError } from "@/utils";

export const usePostCreate = () => {
    const { toast } = useToast();
    const { t } = useTranslation(["api", "translation"]);

    return useMutation({
        mutationFn: ApiPost.create,
        onError: (error) => {
            if (isApiError(error)) {
                let description = "";
                if (Array.isArray(error.message)) {
                    description = error.message.map((m) => t(("error." + m) as any)).join(", ");
                } else {
                    description = t(("error." + error.message) as any);
                }
                toast({
                    title: t("object.system", { ns: "translation" }),
                    description,
                });
            }
        },
    });
};
