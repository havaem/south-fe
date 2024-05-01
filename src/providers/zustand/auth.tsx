import { StateCreator } from "zustand/vanilla";

import { TStore } from "./type";

export type TAuthState = {
    isLogin: boolean;
    user: any;
};

export type TAuthActions = {
    login: (user: any) => void;
    logout: () => void;
};

export type TAuthSlice = TAuthState & TAuthActions;

export const defaultInitState: TAuthState = {
    isLogin: false,
    user: null,
};

export const createAuthSlice: StateCreator<TStore> = (set, get) => ({
    ...get(),
    auth: {
        ...defaultInitState,
        login: (user) => {
            set((state) => {
                state.auth.isLogin = true;
                state.auth.user = user;
                return state;
            });
        },
        logout: () => {
            set((state) => {
                state.auth.isLogin = false;
                state.auth.user = null;
                return state;
            });
        },
    },
});
export const selectAuth = (state: TStore) => state.auth;
