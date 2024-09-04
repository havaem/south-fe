import { useEffect, useRef, useState } from "react";

import StartGame from "@/games/components/StartGame";
import { CONFIGS } from "@/games/constants";
import { World } from "@/games/cores/World";

const HeavenPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStart, setIsStart] = useState<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = CONFIGS.WIDTH;
        canvas.height = CONFIGS.HEIGHT;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const world = new World({ canvas, ctx });

        world.init();

        return () => {
            world.stop();
        };
    }, [isStart]);

    if (!isStart) {
        return <StartGame setIsGameStarted={setIsStart} />;
    }

    return (
        <div className="fixed inset-0 bg-[#212121] flex-center">
            <div className="relative w-full border border-white">
                <canvas className="size-full" ref={canvasRef}></canvas>
                {/* <Message className="top-2/3 flex min-h-32 w-full min-w-96 max-w-lg absolute-center-x" /> */}
                {/* <HUD /> */}

                {/* Show it when map change */}
                {/* <IFrame /> */}
                {/* <Transition /> */}
            </div>
        </div>
    );
};
export default HeavenPage;
