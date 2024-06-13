import { MultiMedia, SanityImage, assetFragment } from "@/lib/types/assets";
import { RichText } from "@/lib/types/richText";

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
