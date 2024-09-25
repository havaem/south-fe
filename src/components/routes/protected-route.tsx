import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { APP_PATH, LOCAL_STORAGE_KEY } from "@/constants";
import { SocketProvider } from "@/contexts";
import { useAuthGetCurrentUser } from "@/hooks";
import { useProfileGetByUserId } from "@/hooks/queries/useProfileGetByUserId";
import { useAuthStore } from "@/stores";

import Loading from "../loading";

const ProtectedRoute: React.FC = () => {
    const navigate = useNavigate();
    //* store
    const { isLogin, setUser, setToken } = useAuthStore();
    //* query
    const { data, refetch, isSuccess, isError } = useAuthGetCurrentUser({ enabled: false });
    useProfileGetByUserId({
        enabled: isSuccess,
    });
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
            navigate(APP_PATH.AUTH.SIGN_IN);
        } else {
            const handleGetCurrentUser = async () => {
                await refetch()
                    .then(async (data) => {
                        if (!data.data?.data) return;
                        setUser(data.data.data);
                        setToken(localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));
                        setIsLoading(false);
                    })
                    .catch(() => {
                        localStorage.clear();
                        navigate(APP_PATH.AUTH.SIGN_IN);
                        setIsLoading(false);
                    });
            };

            //* 500ms is minimum delay to show loading if refetch done too fast
            Promise.all([handleGetCurrentUser(), new Promise((resolve) => setTimeout(resolve, 500))]);
        }
    }, [refetch, isLogin, setUser, navigate]);

    if (isError) return <Navigate to={APP_PATH.AUTH.SIGN_IN} />;
    if (isLoading) return <Loading />;
    if (isLogin)
        return (
            <SocketProvider>
                <Outlet />
            </SocketProvider>
        );

    return <></>;
};
export default ProtectedRoute;
