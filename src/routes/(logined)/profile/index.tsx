import { CircleCheckBig } from "lucide-react";

import { Avatar } from "@/components/modified-ui";
import { Button } from "@/components/ui/button";
import { useProfileGetByUserId } from "@/hooks/queries/useProfileGetByUserId";
import { renderName, shortestName } from "@/utils";

const ProfilePage = () => {
    const { data: dataProfileCurrentUser } = useProfileGetByUserId();
    return (
        <div>
            <div className="relative aspect-[10/3]">
                <img alt="cover" className="h-full w-full object-cover" src={dataProfileCurrentUser?.data.cover} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-25"></div>
                <div className="absolute bottom-4 right-4 z-10 gap-4 flex-center-y">
                    <Button variant="secondary">Change cover</Button>
                </div>
            </div>
            <div className="flex gap-4 px-4 pb-4 shadow">
                <Avatar
                    className="-mt-28 w-fit"
                    src={dataProfileCurrentUser?.data.avatar}
                    text={shortestName(dataProfileCurrentUser?.data.name)}
                    avatarProps={{
                        className: "size-52 border-4 border-background shadow",
                    }}
                />
                <div className="mt-auto space-y-1">
                    <div className="gap-2 flex-center-y">
                        <h2 className="text-2xl font-medium">{renderName(dataProfileCurrentUser?.data.name)}</h2>
                        <CircleCheckBig />
                    </div>
                    <p className="text-muted-foreground">Description</p>
                </div>
                <div className="ml-auto mt-auto gap-4 flex-center-y">
                    <Button variant="outline">Edit profile</Button>
                    <Button>Follow</Button>
                    <Button variant="destructive">Unfollow</Button>
                    <Button variant="secondary">Message</Button>
                </div>
            </div>
            <div className="h-10 bg-secondary"></div>
        </div>
    );
};
export default ProfilePage;
