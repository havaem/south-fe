import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Avatar from "@/components/modified-ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_PATH } from "@/constants";
import { useAuthStore } from "@/stores";
import { shortestName } from "@/utils";

interface Props {}
const UserNavigation: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuthStore();

    const handleLogout = () => logOut();
    const handleChangePath = (path: string) => () => navigate(path);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar src={user?.avatar} text={shortestName(user?.name)} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-80">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleChangePath(APP_PATH.PROFILE)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleChangePath(APP_PATH.SETTINGS)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default UserNavigation;
