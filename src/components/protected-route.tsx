"use client";
import { redirect, useRouter } from "next/navigation";
import { PropsWithChildren, useLayoutEffect, useState } from "react";

import { APP_PATH, LOCAL_STORAGE_KEY } from "@/constants";
import { useAuthGetProfile } from "@/hooks/queries/useAuthGetProfile";
import { selectAuth, useRootStore } from "@/providers";

import Loading from "./loading";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    //* router
    const router = useRouter();
    //* store
    const { isLogin } = useRootStore(selectAuth);
    //* query
    const { data, refetch } = useAuthGetProfile({ enabled: false });
    //* state
    const [isLoading, setIsLoading] = useState<boolean>(
        Boolean(!data || localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)),
    );

    //* effect
    useLayoutEffect(() => {
        if (isLogin) return;

        if (!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) router.push(APP_PATH.HOME);
        else {
            //* 500ms is minimum delay to show loading if refetch done too fast
            Promise.all([refetch(), new Promise((resolve) => setTimeout(resolve, 500))]).then((data) => {
                setIsLoading(false);
                if (data[0].isError) router.push(APP_PATH.HOME);
            });
        }
    }, [refetch, router, isLogin]);

    if (isLogin) return <>{children}</>;
    if (isLoading) return <Loading />;
    return null;
};
export default ProtectedRoute;
