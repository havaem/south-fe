import { Outlet } from "react-router-dom";

const GameLayout: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-[#212121] flex-center ">
            <Outlet />
        </div>
    );
};
export default GameLayout;
