import Post from "@/components/post";
import PostNew from "@/components/post-new";

import DashboardLayout from "./layout";

const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-2xl space-y-4">
                <PostNew />
                <Post />
                <Post />
            </div>
        </DashboardLayout>
    );
};
export default Dashboard;
