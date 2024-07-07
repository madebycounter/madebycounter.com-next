import { defineType } from "sanity";

import { assetFragment } from "../objects/assets";
import { PortfolioItem } from "../portfolioItem";

export const portfolioItemGroupSchema = defineType({
    name: "portfolioItemGroup",
    title: "Portfolio Item Group",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "items",
            title: "Portfolio Items",
            type: "array",
            of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "items.0.thumbnail",
            service0: "items.0.title",
            service1: "items.1.title",
            service2: "items.2.title",
            service3: "items.3.title",
        },
        prepare({ title, media, service0, service1, service2, service3 }) {
            const titles = [service0, service1, service2].filter(Boolean);
            const hasMoreTitles = Boolean(service3);
            return {
                title,
                subtitle: hasMoreTitles
                    ? `${titles.join(", ")}...`
                    : titles.join(", "),
                media: media,
            };
        },
    },
});

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
