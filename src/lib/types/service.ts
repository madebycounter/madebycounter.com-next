import { query } from "@/lib/sanity";

import { MultiMedia, MuxVideo, assetFragment } from "./assets";
import { FunFact, funFactFragment } from "./components/funFact";
import { TeamMember, teamMemberFragment } from "./components/teamMember";
import { Testimonial, testimonialFragment } from "./components/testimonial";
import { MediaGroup, mediaGroupFragment } from "./groups/mediaGroup";
import {
    MiniServiceGroup,
    miniServiceGroupFragment,
} from "./groups/miniServiceGroup";
import {
    PortfolioItemGroup,
    portfolioItemGroupFragment,
} from "./groups/portfolioItemGroup";
import { RichText } from "./richText";
import { PageSeoData, pageSeoDataFragment } from "./singletons/seoData";

export type ServiceContent = {
    references: { _id: string; _type: string }[];
    funFacts: FunFact[];
    testimonials: Testimonial[];
    mediaGroups: MediaGroup[];
    miniServiceGroups: MiniServiceGroup[];
    portfolioItemGroups: PortfolioItemGroup[];
};

export interface Service {
    _id: string;
    _type: "service";
    title: string;
    slideshow: MultiMedia[];
    videoSnippet: MuxVideo;
    videoEmbed: string;
    heroText: RichText;
    teamMember: TeamMember;
    content: ServiceContent;
    callToAction: string;
    offerings: string[];
    seoData: PageSeoData;
    slug: { current: string };
}

export const serviceFragment = `
    _id,
    _type,
    title,
    slideshow[] {
        _key,
        ${assetFragment}
    },
    videoSnippet {
        ${assetFragment}
    },
    videoEmbed,
    heroText,
    teamMember->{
        ${teamMemberFragment}
    },
    "content": {
        "references": content[]->{
            _id,
            _type,
        },
        "funFacts": content[@->_type=="funFact"]->{
            ${funFactFragment}
        },
        "testimonials": content[@->_type=="testimonial"]->{
            ${testimonialFragment}
        },
        "mediaGroups": content[@->_type=="mediaGroup"]->{
            ${mediaGroupFragment}
        },
        "miniServiceGroups": content[@->_type=="miniServiceGroup"]->{
            ${miniServiceGroupFragment}
        },
        "portfolioItemGroups": content[@->_type=="portfolioItemGroup"]->{
            ${portfolioItemGroupFragment}
        }
    },
    callToAction,
    offerings[],
    seoData {
        ${pageSeoDataFragment}
    },
    slug,
`;

export async function useServices(): Promise<Service[]> {
    return await query(
        `*[_type == "service"] {
        _id,
        _type,
        title,
        slideshow[] {
            _key,
            ${assetFragment}
        },
        videoSnippet {
            ${assetFragment}
        },
        videoEmbed,
        teamMember->{
            ${teamMemberFragment}
        },
        offerings[],
        slug,
    }`,
        {},
        ["service"],
    );
}

export async function useService(slug: string): Promise<Service> {
    return await query(
        `*[_type == "service" && slug.current == $slug][0] {
            ${serviceFragment}
        }`,
        { slug },
        ["service"],
    );
}
