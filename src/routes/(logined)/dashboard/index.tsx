import Post from "@/components/post";
import PostNew from "@/components/post-new";
import { usePostGetAll } from "@/hooks";

const Dashboard = () => {
    const { data } = usePostGetAll({});

    return (
        <div className="mx-auto max-w-2xl space-y-4 py-6">
            <PostNew />
            {data?.data.map((post) => <Post data={post} key={post._id} />)}
        </div>
    );
};
export default Dashboard;
