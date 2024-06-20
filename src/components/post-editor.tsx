import { Plate, PlateContent } from "@udecode/plate-common";
import { useTranslation } from "react-i18next";

interface Props {}
const PostEditor: React.FC<Props> = () => {
    const { t } = useTranslation();
    return (
        <Plate>
            <PlateContent placeholder={t("post.what_is_on_your_mind")} />
        </Plate>
    );
};
export default PostEditor;
