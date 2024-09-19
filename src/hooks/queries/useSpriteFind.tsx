import { useQuery } from "@tanstack/react-query";

import { ApiSprite } from "@/apis/sprite";

interface IProps {
    id: string;
    opts: {
        enabled?: boolean;
    };
}
export const useSpriteFind = ({ id, opts }: IProps) =>
    useQuery({
        queryKey: ["spriteFind", id],
        queryFn: () => ApiSprite.findById(id),
        ...opts,
    });
