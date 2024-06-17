import { Plate, PlateContent } from "@udecode/plate-common";

import { useAuthStore } from "@/stores";

import DashboardLayout from "./layout";

const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <DashboardLayout>
            <div>
                <h1>Welcome, {user?.name.first}</h1>
                <p>This is your dashboard.</p>
                <Plate>
                    <PlateContent placeholder="Type..." />
                </Plate>
            </div>
        </DashboardLayout>
    );
};
export default Dashboard;
