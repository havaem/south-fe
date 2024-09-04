import PixelBox from "./pixel/Box";

interface Props {
    setIsGameStarted: (isGameStarted: boolean) => void;
}
const StartGame: React.FC<Props> = ({ setIsGameStarted }) => {
    return (
        <div className="fixed inset-0 bg-teal-400 flex-center">
            <PixelBox className="relative w-full max-w-lg">
                <div className="flex-col flex-center">
                    <img alt="logo" className="w-3/5" src="/assets/images/logo.png" />
                    <div className="font-pixel flex flex-col items-stretch gap-2 text-3xl">
                        <button
                            className="border-2 border-slate-100 px-6 py-2 transition-all hover:border-teal-400"
                            onClick={setIsGameStarted.bind(null, true)}
                        >
                            Start
                        </button>
                        <button className="border-2 border-slate-100 px-6 py-2 transition-all hover:border-teal-400">
                            Credits
                        </button>
                    </div>
                </div>
            </PixelBox>
        </div>
    );
};
export default StartGame;
