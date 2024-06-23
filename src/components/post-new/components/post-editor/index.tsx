import { Plate, PlateContent, PlateEditor } from "@udecode/plate-common";
import { MutableRefObject } from "react";
import { useTranslation } from "react-i18next";

import { usePostContext } from "../../post-context";
import { plugins } from "./plugins";

interface Props {
    editorRef: MutableRefObject<PlateEditor | null>;
}
const PostEditor: React.FC<Props> = ({ editorRef }) => {
    const { t } = useTranslation();
    const { handleChangeContent } = usePostContext();
    return (
        <Plate editorRef={editorRef} plugins={plugins} onChange={handleChangeContent}>
            <PlateContent className="break-words outline-0" placeholder={t("post.what_is_on_your_mind")} />
        </Plate>
    );
};
export default PostEditor;
