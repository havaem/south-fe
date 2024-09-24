import { useEffect, useRef, useState } from "react";

import Hud from "@/games/components/Hud";
import IFrame from "@/games/components/IFrame";
import Message from "@/games/components/Message";
import StartGame from "@/games/components/StartGame";
import { CONFIGS } from "@/games/constants";
import { World } from "@/games/cores/World";
import { buildMap } from "@/games/utils";
import { useReadyGame } from "@/hooks";

import EventWrapper from "./events";

const HeavenPage = () => {
    const { isLoading, map, player } = useReadyGame();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStart, setIsStart] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = CONFIGS.WIDTH;
        canvas.height = CONFIGS.HEIGHT;

        const ctx = canvas.getContext("2d");
        if (!ctx || !player) return;

        const world = new World({ canvas, ctx, playerId: player.id });

        if (map && player && !isLoading) {
            const mapBuild = buildMap({
                map,
                player,
            });
            world.init({ map: mapBuild });
        }

        return () => {
            world.stop();
        };
    }, [isStart, map, player, isLoading]);

    if (!isStart) {
        return <StartGame isStartButtonDisabled={isLoading} setIsGameStarted={setIsStart} />;
    }
    console.log("GAME RE_RENDER");
    return (
        <EventWrapper>
            <div className="fixed inset-0 bg-[#212121] flex-center">
                <div className="relative w-full border border-white">
                    <canvas className="size-full" ref={canvasRef}></canvas>
                    <Message className="top-2/3 flex min-h-32 w-full min-w-96 max-w-lg absolute-center-x" />
                    <Hud />

                    {/* Show it when map change */}
                    <IFrame />
                    {/* <Transition /> */}
                </div>
            </div>
        </EventWrapper>
    );
};
export default HeavenPage;
