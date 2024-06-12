import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { APP_PATH, LOCAL_STORAGE_KEY } from "@/constants";
import { useAuthGetProfile } from "@/hooks/queries/useAuthGetProfile";
import { useAuthStore } from "@/stores";

import Loading from "./loading";

interface IProps {
    isCheckOnly?: boolean;
}

const ProtectedRoute: React.FC<IProps> = ({ isCheckOnly }) => {
    const navigate = useNavigate();
    //* store
    const { isLogin, setUser } = useAuthStore();
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
            navigate(APP_PATH.AUTH.SIGN_IN);
        } else {
            //* 500ms is minimum delay to show loading if refetch done too fast
            Promise.all([refetch(), new Promise((resolve) => setTimeout(resolve, 500))]).then((data) => {
                setIsLoading(false);
                if (!data[0].data?.data) {
                    localStorage.clear();
                    navigate(APP_PATH.AUTH.SIGN_IN);
                    return;
                }
                setUser(data[0].data?.data);
            });
        }
    }, [refetch, isLogin, setUser, navigate]);

    if (isLoading) return <Loading />;
    if (isLogin) return <Outlet />;
    if (isCheckOnly && !isLoading && !isLogin) return <Outlet />;
    return <></>;
};
export default ProtectedRoute;
