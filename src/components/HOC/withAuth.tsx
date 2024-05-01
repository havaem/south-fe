"use client";
import { BaseContext } from "next/dist/shared/lib/utils";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

import { APP_PATH } from "@/constants";
import { selectAuth, useRootStore } from "@/providers";

function withAuth<T extends BaseContext>(Component: React.FC<T>) {
    return function WithAuth(props: T) {
        const { isLogin } = useRootStore(selectAuth);

        useLayoutEffect(() => {
            if (!isLogin) redirect(APP_PATH.AUTH.SIGN_IN);
        }, [isLogin]);

        if (!isLogin) return null;

        return <Component {...props} />;
    };
}

export default withAuth;
