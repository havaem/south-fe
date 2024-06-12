import { NavLink } from "react-router-dom";

import { APP_PATH } from "@/constants";

interface Props {}
const Header: React.FC<Props> = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container h-14 max-w-screen-xl flex-center-y">
                <NavLink className="font-bold" to={APP_PATH.HOME}>
                    South
                </NavLink>
            </div>
        </header>
    );
};
export default Header;
