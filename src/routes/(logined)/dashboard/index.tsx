import Post from "@/components/post";
import PostNew from "@/components/post-new";
import { usePostGetAll } from "@/hooks";
import { postSchema } from "@/types";

const Dashboard = () => {
    const { data } = usePostGetAll({});

    const parseData = postSchema.array().safeParse(data?.data);
    return (
        <div className="mx-auto max-w-2xl space-y-4 py-6">
            <PostNew />
            {parseData.success && parseData.data.map((post) => <Post data={post} key={post._id} />)}
        </div>
    );
};
export default Dashboard;
