import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useSocket } from "@/contexts";

const SocketRoute: React.FC<{ namespace: string }> = ({ namespace }) => {
    const socket = useSocket(namespace);

    useEffect(() => {
        if (socket && !socket.connected) {
            socket.connect();
        }
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    return <Outlet />;
};

export default SocketRoute;
