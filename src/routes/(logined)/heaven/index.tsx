import { useEffect, useRef, useState } from "react";

import StartGame from "@/games/components/StartGame";
import { CONFIGS, EDirection, OBJECT } from "@/games/constants";
import { Animation } from "@/games/cores/Animation";
import { FrameIndexPattern } from "@/games/cores/FrameIndexPattern";
import { resources } from "@/games/cores/Resource";
import { Sprite } from "@/games/cores/Sprite";
import { Vector2 } from "@/games/cores/Vector2";
import { World } from "@/games/cores/World";
import { WorldObject } from "@/games/cores/WorldObject";
import { buildMap, toGridSize } from "@/games/utils";
import { PERSON_ANIMATIONS } from "@/games/utils/personAnimation";
import { useReadyGame } from "@/hooks";

const HeavenPage = () => {
    const { map } = useReadyGame();

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

        if (map) {
            const mapBuild = buildMap({
                name: "Welcome",
                map,
                player: new WorldObject({
                    id: OBJECT.HERO,
                    facingDirection: EDirection.DOWN,
                    isPlayerControlled: true,
                    position: {
                        x: toGridSize(4),
                        y: toGridSize(6),
                    },
                    body: new Sprite({
                        resource: resources.images.heroScott,
                        frameSize: new Vector2(toGridSize(1), toGridSize(2)),
                        hFrames: 24,
                        vFrames: 5,
                        frame: 3,
                        position: new Vector2(0, -20),
                        animations: new Animation({
                            standDown: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_DOWN),
                            standUp: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_UP),
                            standLeft: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_LEFT),
                            standRight: new FrameIndexPattern(PERSON_ANIMATIONS.STAND_RIGHT),
                            walkDown: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_DOWN),
                            walkUp: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_UP),
                            walkLeft: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_LEFT),
                            walkRight: new FrameIndexPattern(PERSON_ANIMATIONS.WALK_RIGHT),
                        }),
                    }),
                }),
            });
            console.log("mapBuild: ", mapBuild);
            world.init({ map: mapBuild });
        }

        return () => {
            world.stop();
        };
    }, [isStart, map]);

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
