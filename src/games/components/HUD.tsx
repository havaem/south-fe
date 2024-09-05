import PixelBox from "./pixel/Box";

const HUD: React.FC = () => {
    return (
        <div className="pointer-events-none absolute left-4 top-4 z-40 select-none font-game">
            <PixelBox noPadding>
                <div>
                    <div className="aspect-square w-28">
                        <img
                            alt=""
                            className="size-full object-cover"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZls4xWO-JbAVHXvb_5lsEYqKAW3viqjDavw&s"
                        />
                    </div>
                </div>
            </PixelBox>
            <div className="text-white">
                <p className="mt-1 px-2 py-1 text-center text-xs">
                    1000<span>$</span>
                </p>
            </div>
        </div>
    );
};
export default HUD;
