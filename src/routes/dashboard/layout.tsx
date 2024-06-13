import { PropsWithChildren } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    );
};
export default DashboardLayout;
