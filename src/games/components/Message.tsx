import { memo, useEffect, useState } from "react";

import { EEventName } from "../constants/event";
import { events } from "../cores/Events";
import { TextMessage } from "../cores/TextMessage";
import PixelBox from "./pixel/Box";
import TextTyping from "./TextTyping";
interface IProps {
    className?: string;
}
const Message: React.FC<IProps> = ({ className }) => {
    const [message, setMessage] = useState<string>("");
    const [callBack, setCallBack] = useState<Function>();

    const handleClickNext = () => {
        if (callBack) callBack();
    };

    useEffect(() => {
        events.on(EEventName.MESSAGE, null, (message: TextMessage) => {
            setMessage(message.text);
            setCallBack(() => message.done.bind(message));
        });

        events.on(EEventName.MESSAGE_DONE, null, () => {
            setMessage("");
        });
    }, []);

    if (!message) return null;

    return (
        <div className={className}>
            <PixelBox className="flex-1">
                <div className="">
                    <p className="font-pixel text-2xl">
                        <TextTyping text={message} />
                    </p>
                </div>
                {callBack && (
                    <button className="absolute inset-0 z-50 bg-transparent" onClick={handleClickNext}></button>
                )}
            </PixelBox>
            <div className="absolute bottom-2 right-2">
                <div className="size-2 animate-show-and-hide bg-black">
                    <div className="size-1 bg-white absolute-center"></div>
                </div>
            </div>
        </div>
    );
};
export default memo(Message);
