import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { IAuthResponse, IUser, UserSchema, zAuthResponse } from "@/types";

export type TAuthStore = {
    isLogin: boolean;
    user: IUser | null;
    logIn: (data: IAuthResponse) => void;
    setUser: (user: IUser) => void;
    logOut: () => void;
};

export const useAuthStore = create<TAuthStore>()(
    devtools((set) => ({
        isLogin: false,
        user: null,
        setUser: (user: IUser) => {
            const safeParse = UserSchema.safeParse(user);
            if (!safeParse.success) return;
            set({ user: safeParse.data, isLogin: true });
        },
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
