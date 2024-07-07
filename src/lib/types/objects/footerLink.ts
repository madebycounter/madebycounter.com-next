import { LinkIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const footerLinkSchema = defineType({
    name: "footerLink",
    type: "object",
    icon: LinkIcon,
    fields: [
        {
            name: "text",
            title: "Link Text",
            type: "string",
        },
        {
            name: "url",
            title: "URL",
            type: "string",
        },
        {
            name: "external",
            title: "External",
            type: "boolean",
            initialValue: true,
        },
    ],
    preview: {
        select: {
            title: "text",
            subtitle: "url",
        },
    },
});

export const footerLinkFragment = `
    text,
    url,
    external
`;

export interface FooterLink {
    text?: string;
    url?: string;
    external: boolean;
}
