import Post from "@/components/post";
import PostNew from "@/components/post-new";
import { usePostGetAll } from "@/hooks";
import { postSchema } from "@/types";

import DashboardLayout from "./layout";

const Dashboard = () => {
    const { data } = usePostGetAll({});

    const parseData = postSchema.array().safeParse(data?.data);
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-2xl space-y-4">
                <PostNew />
                {parseData.success && parseData.data.map((post) => <Post data={post} key={post._id} />)}
            </div>
        </DashboardLayout>
    );
};
export default Dashboard;
