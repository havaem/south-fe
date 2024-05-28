import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { IAuthResponse, IUser, zAuthResponse } from "@/types";
export type TAuthState = {
    isLogin: boolean;
    user: IUser | null;
};

export type TAuthActions = {
    logIn: (data: IAuthResponse) => void;
    logOut: () => void;
};

export type TAuthStore = TAuthState & TAuthActions;

export const useAuthStore = create<TAuthStore>()(
    devtools((set) => ({
        isLogin: false,
        user: null,
        logIn: (data: IAuthResponse) => {
            const safeParse = zAuthResponse.safeParse(data);
            if (!safeParse.success) return;
            const { user, token } = safeParse.data;
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token.accessToken);
            localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, token.refreshToken);
            set({
                isLogin: true,
                user,
            });
        },
        logOut: () => {
            set({
                isLogin: false,
                user: null,
            });
            localStorage.clear();
        },
    })),
);
