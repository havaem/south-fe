import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { cn } from "@/utils";

interface Props {
    title: string;
    href: string;
}
const NavigationItem: React.FC<Props> = ({ title, href }) => {
    const { t } = useTranslation();
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
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {t(title as any)}
            </NavLink>
        </li>
    );
};
export default NavigationItem;
