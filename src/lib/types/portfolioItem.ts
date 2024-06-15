import { client } from "@/lib/sanity";

import { MultiMedia, SanityImage, assetFragment } from "./assets";
import { RichText } from "./richText";

export interface PortfolioItem {
    _id: string;
    _type: "portfolioItem";
    title: string;
    date: string;
    description: RichText;
    thumbnail: SanityImage;
    heroMedia: MultiMedia[];
    heroEmbed: string;
    gallery: MultiMedia[];
    slug: { current: string };
    tags: string[];
    hidden: boolean;
}

export const portfolioItemFragment = `
    _id,
    _type,
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
    tags[],
    slug,
    hidden
`;

export async function usePortfolioItems(): Promise<PortfolioItem[]> {
    return await client.fetch(`*[_type == "portfolioItem"] | order(date desc) {
        ${portfolioItemFragment}
    }`);
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await client.fetch(
        `*[_type == "portfolioItem" && slug.current == $slug][0] {
            ${portfolioItemFragment}
        }`,
        { slug },
    );
}
