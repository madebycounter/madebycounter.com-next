import { query } from "@/lib/sanity";
import {
    Service,
    assetFragment,
    teamMemberFragment,
    serviceFragment,
} from "@/lib/types";

export async function useServices(): Promise<Service[]> {
    return await query(
        `*[_type == "service"] {
        _id,
        _type,
        _updatedAt,
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
        ["service", "teamMember"],
    );
}

export async function useService(slug: string): Promise<Service> {
    return await query(
        `*[_type == "service" && slug.current == $slug][0] {
            ${serviceFragment}
        }`,
        { slug },
        [
            "service",
            "teamMember",
            "funFact",
            "testimonial",
            "mediaGroup",
            "miniServiceGroup",
            "portfolioItemGroup",
        ],
    );
}
