import { PropsWithChildren } from "react";

import Header from "./components/Header";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container py-6">{children}</main>
        </>
    );
};
export default DashboardLayout;
