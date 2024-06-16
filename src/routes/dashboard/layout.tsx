import { PropsWithChildren } from "react";

import Header from "./components/Header";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};
export default DashboardLayout;
