import { LoaderPinwheel } from "lucide-react";

interface Props {}
const Loading: React.FC<Props> = () => {
    return (
        <div className="fixed inset-0 z-10 flex-center">
            <LoaderPinwheel className="text-primary-500 animate-spin" size={44} />
        </div>
    );
};
export default Loading;
