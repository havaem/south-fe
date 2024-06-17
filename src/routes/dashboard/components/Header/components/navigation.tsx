import { HEADER_NAV } from "@/constants/header-nav";

import NavigationItem from "./navigation-item";

interface Props {}
const Navigation: React.FC<Props> = () => {
    return (
        <ul className="ml-4 gap-4 text-sm flex-center-y">
            {HEADER_NAV.map((item) => (
                <NavigationItem key={item.href} {...item} />
            ))}
        </ul>
    );
};
export default Navigation;
