import { createPlugins } from "@udecode/plate-common";
import { createMentionPlugin, ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from "@udecode/plate-mention";

import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";

export const plugins = createPlugins(
    [
        createMentionPlugin({
            component: MentionElement,
            props: {
                prefix: "@",
            },
        }),
        {
            key: ELEMENT_MENTION,
            options: {
                insertSpaceAfterMention: true,
            },
        },
    ],
    {
        components: {
            [ELEMENT_MENTION_INPUT]: MentionInputElement,
        },
    },
);
