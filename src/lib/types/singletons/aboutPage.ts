import { query } from "@/lib/sanity";
import { Service } from "@/lib/types/service";

import { MultiMedia, assetFragment } from "../assets";
import { TeamMember, teamMemberFragment } from "../components/teamMember";
import { PortfolioItem, portfolioItemPartialFragment } from "../portfolioItem";

export interface AboutPageHero {
    row1: MultiMedia[];
    row2: MultiMedia[];
    row3: MultiMedia[];
    row4: MultiMedia[];
    row5: MultiMedia[];
    row6: MultiMedia[];
    row7: MultiMedia[];
}

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    hero: AboutPageHero;
    luke: TeamMember;
    henry: TeamMember;
    william: TeamMember;
    lukeService: Service;
    henryService: Service;
    williamService: Service;
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
    hero {
        row1[] {
            ${assetFragment}
        },
        row2[] {
            ${assetFragment}
        },
        row3[] {
            ${assetFragment}
        },
        row4[] {
            ${assetFragment}
        },
        row5[] {
            ${assetFragment}
        },
        row6[] {
            ${assetFragment}
        },
        row7[] {
            ${assetFragment}
        }
    },
    "luke": *[_type=="teamMember" && slug.current == "luke-a-makinson"][0] {
        ${teamMemberFragment}
    },
    "henry": *[_type=="teamMember" && slug.current == "henry-buck"][0] {
        ${teamMemberFragment}
    },
    "william": *[_type=="teamMember" && slug.current == "william-gardner"][0] {
        ${teamMemberFragment}
    },
    "lukeService": *[_type=="service" && slug.current == "videography"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
    },
    "henryService": *[_type=="service" && slug.current == "photography"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
    },
    "williamService": *[_type=="service" && slug.current == "drone-piloting"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
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
        ${portfolioItemPartialFragment}
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
        ${portfolioItemPartialFragment}
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
        ${portfolioItemPartialFragment}
    }
`;

export async function useAboutPage(): Promise<AboutPage> {
    return await query(
        `*[_type == "aboutPage"][0] {
            ${aboutPageFragment}
        }`,
        {},
        ["aboutPage", "service", "teamMember"],
    );
}
