import { NavLink } from "react-router-dom";

import { cn } from "@/utils";

interface Props {
    title: string;
    href: string;
}
const NavigationItem: React.FC<Props> = ({ title, href }) => {
    return (
        <li>
            <NavLink
                to={href}
                className={({ isActive }) =>
                    cn(
                        isActive ? "text-foreground" : "text-foreground/60",
                        "transition-colors hover:text-foreground/80",
                    )
                }
            >
                {title}
            </NavLink>
        </li>
    );
};
export default NavigationItem;
