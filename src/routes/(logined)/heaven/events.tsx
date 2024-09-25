import { PropsWithChildren, useEffect } from "react";

import { ESocketEvent, ESocketNamespace } from "@/constants/socket";
import { useSocket } from "@/contexts";
import { useReadyGame } from "@/hooks";

const EventWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    const { map } = useReadyGame();
    const socket = useSocket(ESocketNamespace.GAME_EVENT);

    useEffect(() => {
        if (!socket || !map) return;

        socket.emit(ESocketEvent.JOIN_MAP, {
            mapId: map._id,
        });

        socket.on(ESocketEvent.JOIN_MAP, (data) => {
            console.log("JOIN_MAP", data);
        });

        return () => {
            socket.emit(ESocketEvent.LEAVE_MAP, {
                mapId: map._id,
            });
        };
    }, [map, socket]);

    return <>{children}</>;
};
export default EventWrapper;
