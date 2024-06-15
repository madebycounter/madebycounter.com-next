import { client } from "@/lib/sanity";

import { MultiMedia, assetFragment } from "./assets";
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
    videoEmbed: string;
    heroText: RichText;
    teamMember: TeamMember;
    content: ServiceContent;
    callToAction: string;
    offerings: string[];
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
    slug,
`;

export async function useServices(): Promise<Service[]> {
    return await client.fetch(`*[_type == "service"] {
        ${serviceFragment}
    }`);
}

export async function useService(slug: string): Promise<Service> {
    return await client.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
            ${serviceFragment}
        }`,
        { slug },
    );
}
