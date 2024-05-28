import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen p-4 flex-center">
            <Outlet />
        </div>
    );
};
export default AuthLayout;
