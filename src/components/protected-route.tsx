"use client";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useLayoutEffect, useState } from "react";

import { APP_PATH, LOCAL_STORAGE_KEY } from "@/constants";
import { useAuthGetProfile } from "@/hooks/queries/useAuthGetProfile";
import { selectAuth, useRootStore } from "@/providers";
import { UserSchema } from "@/types";

import Loading from "./loading";

interface IProps extends PropsWithChildren {
    checkOnly?: boolean;
}

const ProtectedRoute: React.FC<IProps> = ({ children, checkOnly }) => {
    //* router
    const router = useRouter();
    //* store
    const { isLogin, logIn: login } = useRootStore(selectAuth);
    //* query
    const { data, refetch } = useAuthGetProfile({ enabled: false });
    //* state
    const [isLoading, setIsLoading] = useState<boolean>(
        Boolean(!data || localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)),
    );

    //* effect
    useLayoutEffect(() => {
        if (isLogin) {
            setIsLoading(false);
            return;
        }

        if (!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) {
            setIsLoading(false);
            router.push(APP_PATH.HOME);
        } else {
            //* 500ms is minimum delay to show loading if refetch done too fast
            Promise.all([refetch(), new Promise((resolve) => setTimeout(resolve, 500))]).then((data) => {
                setIsLoading(false);
                if (data[0].isError) router.push(APP_PATH.AUTH.SIGN_IN);
                else {
                    const safeData = UserSchema.safeParse(data[0].data?.data);
                    if (safeData.success) login(safeData.data);
                }
            });
        }
    }, [refetch, router, isLogin, login]);

    console.log("isLogin: ", isLogin);
    console.log("isLoading: ", isLoading);
    if (isLogin) return <>{children}</>;
    if (isLoading) return <Loading />;
    if (checkOnly && !isLoading && !isLogin) return <>{children}</>;
    return null;
};
export default ProtectedRoute;
