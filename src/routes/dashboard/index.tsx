import Post from "@/components/post";
import PostEditor from "@/components/post-editor";
import { useAuthStore } from "@/stores";

import DashboardLayout from "./layout";

const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <DashboardLayout>
            <div>
                <h1>Welcome, {user?.name.first}</h1>
                <p>This is your dashboard.</p>
                <PostEditor />
                <Post />
            </div>
        </DashboardLayout>
    );
};
export default Dashboard;
