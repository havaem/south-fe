"use client";
import { createContext, ReactNode, useContext, useRef } from "react";
import { createStore, type StoreApi, useStore } from "zustand";
import { devtools } from "zustand/middleware";

import { createAuthSlice } from "./auth";
import { TStore } from "./type";

export const RootStoreContext = createContext<StoreApi<TStore> | null>(null);

export const createRootStore = () => {
    return createStore<TStore>()(
        devtools((...props) => ({
            ...createAuthSlice(...props),
        })),
    );
};

export interface RootStoreProviderProps {
    children?: ReactNode;
}

export const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
    const storeRef = useRef<StoreApi<TStore>>();
    if (!storeRef.current) {
        storeRef.current = createRootStore();
    }

    return <RootStoreContext.Provider value={storeRef.current}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = <T,>(selector: (store: TStore) => T): T => {
    const rootStoreContext = useContext(RootStoreContext);

    if (!rootStoreContext) {
        throw new Error(`useRootStore must be use within RootStoreProvider`);
    }

    return useStore(rootStoreContext, selector);
};
