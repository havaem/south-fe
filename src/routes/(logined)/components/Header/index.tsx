import { NavLink } from "react-router-dom";

import { APP_PATH } from "@/constants";

import Navigation from "./components/navigation";
import UserNavigation from "./components/user-navigation";

interface Props {}
const Header: React.FC<Props> = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container h-14 max-w-screen-2xl flex-center-y">
                <NavLink className="flex-center" to={APP_PATH.HOME}>
                    <img alt="" className="h-6 w-6" src="/logo-dark.svg" />
                    <span className="font-bold">South</span>
                </NavLink>
                <Navigation />
                <div className="ml-auto gap-4 flex-center">
                    <UserNavigation />
                </div>
            </div>
        </header>
    );
};
export default Header;
