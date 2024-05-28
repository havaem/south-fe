import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores";

const Dashboard = () => {
    const { user, logOut } = useAuthStore();

    return (
        <div>
            {user && (
                <div>
                    <h1>Welcome, {user.name.first}</h1>
                    <p>This is your dashboard.</p>
                </div>
            )}
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
};
export default Dashboard;
