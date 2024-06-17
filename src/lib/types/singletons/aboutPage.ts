import { client } from "@/lib/sanity";

import { MultiMedia, assetFragment } from "../assets";
import { TeamMember, teamMemberFragment } from "../components/teamMember";
import { PortfolioItem, portfolioItemFragment } from "../portfolioItem";

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    luke: TeamMember;
    henry: TeamMember;
    william: TeamMember;
    lukeButtonImages: MultiMedia[];
    henryButtonImages: MultiMedia[];
    williamButtonImages: MultiMedia[];
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
    "luke": *[_type=="teamMember" && slug.current == "luke-a-makinson"][0] {
        ${teamMemberFragment}
    },
    "henry": *[_type=="teamMember" && slug.current == "henry-buck"][0] {
        ${teamMemberFragment}
    },
    "william": *[_type=="teamMember" && slug.current == "william-gardner"][0] {
        ${teamMemberFragment}
    },
    "lukeButtonImages": *[_type=="service" && slug.current == "videography"][0].slideshow[] {
        ${assetFragment}
    },
    "henryButtonImages": *[_type=="service" && slug.current == "photography"][0].slideshow[] {
        ${assetFragment}
    },
    "williamButtonImages": *[_type=="service" && slug.current == "drone-piloting"][0].slideshow[] {
        ${assetFragment}
    },
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
