import PixelBox from "./pixel/Box";

const BauCua: React.FC = () => {
    return (
        <div className="absolute inset-0 z-10 bg-white p-8">
            <h2 className="text-center font-game text-4xl">BAU CUA TOM CA</h2>
            <div className="m-auto mt-8 grid w-4/5 grid-cols-3 gap-8">
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/nai.png" />
                        <div className="absolute right-4 top-4 font-game text-xl">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/bau.png" />
                        <div className="absolute right-4 top-4 font-game text-xl">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/ga.png" />
                        <div className="absolute right-4 top-4 font-game">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/ca.png" />
                        <div className="absolute right-4 top-4 font-game text-xl">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/cua.png" />
                        <div className="absolute right-4 top-4 font-game text-xl">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
                <button className="h-72 transition-transform hover:-translate-y-2">
                    <PixelBox className="relative h-full">
                        <img alt="bau" className="h-full w-full object-contain" src="/assets/images/bctc/tom.png" />
                        <div className="absolute right-4 top-4 font-game text-xl">
                            <div className="text-blue-500">0$</div>
                            <div className="text-red-500">0$</div>
                        </div>
                    </PixelBox>
                </button>
            </div>
            <div className="mt-4 text-center font-game">
                <span className="text-2xl">MONEY LEFT:</span> <span className="text-3xl">200</span>$
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-slate-100 py-2 text-right font-pixel text-2xl">
                ROOM: e2136sgg7812t3gsy8yw87
            </div>
        </div>
    );
};
export default BauCua;
