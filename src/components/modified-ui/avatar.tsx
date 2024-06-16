import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    text?: string;
    src?: string;
}
const Avatar: React.FC<Props> = ({ text, src }) => {
    return (
        <AvatarBase>
            <AvatarImage src={src} />
            <AvatarFallback>{text}</AvatarFallback>
        </AvatarBase>
    );
};
export default Avatar;
