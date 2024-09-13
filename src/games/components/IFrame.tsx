import { useEffect, useState } from "react";

import { EEventName } from "../constants/event";
import { events } from "../cores/Events";

const IFrame: React.FC = () => {
    const [url, setUrl] = useState("");
    const [resolve, setResolve] = useState<Function | null>(null);

    useEffect(() => {
        events.on(EEventName.OPEN_IFRAME, null, ({ url, resolve }: { url: string; resolve: Function }) => {
            setUrl(url);
            setResolve(() => resolve);
        });
        events.on(EEventName.CLOSE_IFRAME, null, () => {
            setUrl("");
        });
    }, []);

    if (!url) return null;
    return <iframe className="absolute left-0 top-0 z-50 h-full w-full select-none" src={url} title="iframe" />;
};
export default IFrame;
