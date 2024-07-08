import { ComposeIcon, CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";

export const portfolioPageSchema = defineType({
    name: "portfolioPage",
    title: "Portfolio Page",
    type: "document",
    // groups: [
    //     {
    //         name: "content",
    //         title: "Content",
    //         default: true,
    //         icon: ComposeIcon,
    //     },
    //     {
    //         name: "settings",
    //         title: "Settings",
    //         icon: CogIcon,
    //     },
    // ],
    fields: [
        {
            name: "title",
            title: "Page Title",
            type: "string",
            // group: "settings",
        },
        {
            name: "description",
            title: "SEO Description",
            type: "text",
            // group: "settings",
        },
        {
            name: "image",
            title: "SEO Image",
            type: "image",
            // group: "settings",
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Portfolio Page",
            };
        },
    },
});

export const portfolioPageFragment = `
    title,
    description,
    image {
        ${assetFragment}
    }
`;

export type PortfolioPage = {
    title?: string;
    description?: string;
    image?: SanityImage;
};
