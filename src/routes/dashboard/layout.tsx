import { PropsWithChildren } from "react";

import Header from "./components/Header";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
            <footer>Footer</footer>
        </main>
    );
};
export default DashboardLayout;
