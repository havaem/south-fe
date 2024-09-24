import { PropsWithChildren } from "react";

import { ESocketNamespace } from "@/constants/socket";
import { useSocket } from "@/contexts";

const EventWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    useSocket(ESocketNamespace.GAME_EVENT);

    return <>{children}</>;
};
export default EventWrapper;
