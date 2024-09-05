import { useEffect, useState } from "react";

import { EEventName } from "../constants/event";
import { events } from "../cores/Events";

const Transition: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isFading, setIsFading] = useState<boolean>(false);

    useEffect(() => {
        events.on(EEventName.MAP_TRANSITION_START, null, () => {
            setIsShow(true);
            setIsFading(false);
        });
        events.on(EEventName.MAP_TRANSITION_END, null, () => {
            setIsFading(true);
            setTimeout(() => {
                setIsShow(false);
            }, 1000);
        });
    }, []);
    if (!isShow) return null;
    return <div className={`absolute inset-0 z-50 flex ${isFading ? "animate-fade-out bg-white" : ""}`}></div>;
};
export default Transition;
