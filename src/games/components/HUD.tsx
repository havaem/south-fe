import { Volume2, VolumeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useProfileGetByUserId } from "@/hooks/queries/useProfileGetByUserId";
import { renderName } from "@/utils";

import { soundManager } from "../cores/SoundManage";
import PixelBox from "./pixel/Box";

const Hud: React.FC = () => {
    const { data: dataProfileCurrentUser } = useProfileGetByUserId();
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const handleToggleMusicMute = () => {
        setIsMuted((prev) => !prev);
    };

    useEffect(() => {
        soundManager.setVolume(isMuted ? 0 : 1);
    }, [isMuted]);

    return (
        <>
            {/* USER FRAME */}
            <div className="pointer-events-none absolute left-4 top-4 z-40 flex select-none items-start gap-4 font-game">
                <PixelBox noPadding className="relative">
                    <div>
                        <div className="aspect-square w-28">
                            <img
                                alt=""
                                className="size-full object-cover object-center"
                                src={dataProfileCurrentUser?.data.avatar}
                            />
                        </div>
                    </div>
                </PixelBox>
                <div className="flex flex-col items-start gap-2">
                    <PixelBox noPadding className="relative">
                        <div className="px-2 py-1">
                            <p className="text-sm">{renderName(dataProfileCurrentUser?.data.name)}</p>
                        </div>
                    </PixelBox>
                    <PixelBox noPadding className="relative">
                        <div className="px-2 py-1">
                            <p className="text-xs">
                                1000<span className="text-yellow-700">$</span>
                            </p>
                        </div>
                    </PixelBox>
                </div>
            </div>
            {/* SETTING */}
            <div className="absolute right-4 top-4 z-40 gap-4 flex-center-y">
                <Button size="icon" variant="outline" onClick={handleToggleMusicMute}>
                    {isMuted ? <VolumeOff size={16} /> : <Volume2 size={16} />}
                </Button>
            </div>
        </>
    );
};
export default Hud;
