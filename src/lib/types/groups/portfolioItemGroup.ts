import { PortfolioItem, portfolioItemFragment } from "../portfolioItem";

export const portfolioItemGroupFragment = `
    _id,
    _type,
    title,
    items[]->{
        ${portfolioItemFragment}
    },
`;

export interface PortfolioItemGroup {
    _id: string;
    _type: "portfolioItemGroup";
    title: string;
    items: PortfolioItem[];
}
