import { useQuery } from "@tanstack/react-query";

import { ApiSprite } from "@/apis/sprite";

interface IProps {
    enabled?: boolean;
}
export const useSpriteGetCharacterBuilder = (props: IProps) =>
    useQuery({
        queryKey: ["getCharacterBuilder"],
        queryFn: ApiSprite.getCharacterBuilder,
        ...props,
    });
