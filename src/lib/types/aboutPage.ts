import { MultiMedia, assetFragment } from "@/lib/types/assets";

export const aboutPageFragment = `
    _id,
    _type,
    lukeSlideshow1[] {
        _key,
        ${assetFragment}
    },
    lukeSlideshow2[] {
        _key,
        ${assetFragment}
    },
    henrySlideshow1[] {
        _key,
        ${assetFragment}
    },
    henrySlideshow2[] {
        _key,
        ${assetFragment}
    },
    williamSlideshow1[] {
        _key,
        ${assetFragment}
    },
    williamSlideshow2[] {
        _key,
        ${assetFragment}
    }
`;

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    lukeSlideshow1: MultiMedia[];
    lukeSlideshow2: MultiMedia[];
    henrySlideshow1: MultiMedia[];
    henrySlideshow2: MultiMedia[];
    williamSlideshow1: MultiMedia[];
    williamSlideshow2: MultiMedia[];
}
