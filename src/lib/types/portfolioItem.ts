import { query } from "@/lib/sanity";

import { MultiMedia, SanityImage, assetFragment } from "./assets";
import { Testimonial, testimonialFragment } from "./components/testimonial";
import { RichText } from "./richText";
import { Service, serviceFragment } from "./service";

export interface PortfolioItem {
    _id: string;
    _type: "portfolioItem";
    _updatedAt: string;
    title: string;
    date: string;
    tags: string[];
    description: RichText;
    thumbnail: SanityImage;
    heroMedia: MultiMedia[];
    heroEmbed: string;
    gallery: MultiMedia[];
    serviceReference: Service;
    testimonial: Testimonial;
    relatedProjects: PortfolioItem[];
    hidden: boolean;
    slug: { current: string };
}

export const portfolioItemPartialFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    date,
    tags,
    thumbnail {
        ${assetFragment}
    },
    slug,
    hidden
`;

export const portfolioItemFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    description,
    date,
    thumbnail {
        ${assetFragment}
    },
    heroMedia[] {
        _key,
        ${assetFragment}
    },
    heroEmbed,
    gallery[] {
        _key,
        ${assetFragment}
    },
    serviceReference->{
        ${serviceFragment}
    },
    testimonial->{
        ${testimonialFragment}
    },
    relatedProjects[]->{
        _id,
        _type,
        title,
        date,
        tags,
        thumbnail {
            ${assetFragment}
        },
        slug,
        hidden,
    },
    tags[],
    slug,
    hidden,
`;

export async function usePortfolioItems(): Promise<PortfolioItem[]> {
    return await query(
        `*[_type == "portfolioItem"] | order(date desc) {
            ${portfolioItemPartialFragment}
        }`,
        {},
        ["portfolioItem"],
    );
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await query(
        `*[_type == "portfolioItem" && slug.current == $slug][0] {
            ${portfolioItemFragment}
        }`,
        { slug },
        ["portfolioItem", "service", "testimonial"],
    );
}
