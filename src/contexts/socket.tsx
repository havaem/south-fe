import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { ENV } from "@/configs";
import { useAuthStore } from "@/stores";

interface SocketContextProps {
    sockets: { [namespace: string]: Socket | undefined };
    connect: (namespace: string) => void;
    disconnect: (namespace: string) => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface IProps {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<IProps> = ({ children }) => {
    const { accessToken } = useAuthStore();
    const socketsRef = useRef<{ [namespace: string]: Socket }>({});

    const connect = (namespace: string) => {
        console.log("namespace: ", namespace);
        const sockets = socketsRef.current;
        if (!sockets[namespace]) {
            const socket = io(`${ENV.GAME_SOCKET_URL}/${namespace}`, {
                extraHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            socket.on("connect", () => {
                console.log(`Connected to namespace: ${namespace}`);
            });

            socket.on("disconnect", () => {
                console.log(`Disconnected from namespace: ${namespace}`);
            });

            socketsRef.current = {
                ...sockets,
                [namespace]: socket,
            };
        }
    };

    const disconnect = (namespace: string) => {
        const sockets = socketsRef.current;

        if (sockets[namespace]) {
            sockets[namespace].disconnect();
            delete sockets[namespace];
        }
    };

    const value = React.useMemo(
        () => ({
            sockets: socketsRef.current,
            connect,
            disconnect,
        }),
        [socketsRef.current, connect, disconnect],
    );

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = (namespace: string) => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    const { sockets, connect, disconnect } = context;

    useEffect(() => {
        connect(namespace);
        return () => {
            disconnect(namespace);
        };
    }, [namespace]);

    return sockets[namespace];
};
