import { client } from "@/lib/sanity";
import {
    PortfolioItem,
    portfolioItemFragment,
} from "@/lib/types/portfolioItem";

import { MultiMedia, assetFragment } from "../assets";

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    lukeSlideshow1: MultiMedia[];
    lukeSlideshow2: MultiMedia[];
    lukeReferences: PortfolioItem[];
    henrySlideshow1: MultiMedia[];
    henrySlideshow2: MultiMedia[];
    henryReferences: PortfolioItem[];
    williamSlideshow1: MultiMedia[];
    williamSlideshow2: MultiMedia[];
    williamReferences: PortfolioItem[];
}

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
    lukeReferences[]->{
        ${portfolioItemFragment}
    },
    henrySlideshow1[] {
        _key,
        ${assetFragment}
    },
    henrySlideshow2[] {
        _key,
        ${assetFragment}
    },
    henryReferences[]->{
        ${portfolioItemFragment}
    },
    williamSlideshow1[] {
        _key,
        ${assetFragment}
    },
    williamSlideshow2[] {
        _key,
        ${assetFragment}
    },
    williamReferences[]->{
        ${portfolioItemFragment}
    }
`;

export async function useAboutPage(): Promise<AboutPage> {
    return await client.fetch(
        `*[_type == "aboutPage"][0] {
            ${aboutPageFragment}
        }`,
    );
}
