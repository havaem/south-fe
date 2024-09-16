import { useSpriteGetCharacterBuilder } from "@/hooks/queries/useSpriteGetCharacterBuilder";
import { ISpriteGetCharacterBuilderResponse } from "@/types";

export const useReadyCharacterbuilder = () => {
    const { data: dataSpriteGetCharacterBuilder } = useSpriteGetCharacterBuilder({});

    const characterBodies: ISpriteGetCharacterBuilderResponse["Body"] = dataSpriteGetCharacterBuilder?.data.Body ?? [];
    const characterEyes: ISpriteGetCharacterBuilderResponse["Eye"] = dataSpriteGetCharacterBuilder?.data.Eye ?? [];
    const characterHair: ISpriteGetCharacterBuilderResponse["Hairstyle"] =
        dataSpriteGetCharacterBuilder?.data.Hairstyle ?? [];
    const characterOutfits: ISpriteGetCharacterBuilderResponse["Outfit"] =
        dataSpriteGetCharacterBuilder?.data.Outfit ?? [];

    return {
        characterBodies: characterBodies.sort((a, b) => a.name.localeCompare(b.name)),
        characterEyes: characterEyes.sort((a, b) => a.name.localeCompare(b.name)),
        characterHair: characterHair.sort((a, b) => a.name.localeCompare(b.name)),
        characterOutfits: characterOutfits.sort((a, b) => a.name.localeCompare(b.name)),
    };
};
