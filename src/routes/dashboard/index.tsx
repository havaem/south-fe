import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";

import DashboardLayout from "./layout";

const Dashboard = () => {
    const { user, logOut: handleLogOut } = useAuthStore();

    return (
        <DashboardLayout>
            {user && (
                <div>
                    <h1>Welcome, {user.name.first}</h1>
                    <p>This is your dashboard.</p>
                </div>
            )}
            <Button onClick={handleLogOut}>Log out</Button>
        </DashboardLayout>
    );
};
export default Dashboard;
