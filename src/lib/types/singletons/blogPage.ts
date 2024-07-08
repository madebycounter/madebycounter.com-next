import { ComposeIcon, CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";

export const blogPageSchema = defineType({
    name: "blogPage",
    title: "Blog Page",
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
                title: "Blog Page",
            };
        },
    },
});

export const blogPageFragment = `
    title,
    description,
    image {
        ${assetFragment}
    }
`;

export type BlogPage = {
    title?: string;
    description?: string;
    image?: SanityImage;
};
