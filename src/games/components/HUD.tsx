import { useProfileGetByUserId } from "@/hooks/queries/useProfileGetByUserId";
import { renderName } from "@/utils";

import PixelBox from "./pixel/Box";

const Hud: React.FC = () => {
    const { data: dataProfileCurrentUser } = useProfileGetByUserId();

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
        </>
    );
};
export default Hud;
