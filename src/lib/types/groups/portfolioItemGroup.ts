import { assetFragment } from "../assets";
import { PortfolioItem } from "../portfolioItem";

export const portfolioItemGroupFragment = `
    _id,
    _type,
    title,
    items[]->{
        _id,
        _type,
        title,
        date,
        tags,
        thumbnail {
            ${assetFragment}
        },
        slug,
        hidden
    },
`;

export interface PortfolioItemGroup {
    _id: string;
    _type: "portfolioItemGroup";
    title: string;
    items: PortfolioItem[];
}
