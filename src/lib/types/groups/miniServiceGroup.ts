import { defineType } from "sanity";

import { MiniService, miniServiceFragment } from "../components/miniService";

export const miniServiceGroupSchema = defineType({
    name: "miniServiceGroup",
    title: "Mini Service Group",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "items",
            title: "Mini Services",
            type: "array",
            of: [{ type: "reference", to: [{ type: "miniService" }] }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "items.0.photo",
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

export const miniServiceGroupFragment = `
    _id,
    _type,
    title,
    items[]->{
        ${miniServiceFragment}
    },
`;

export interface MiniServiceGroup {
    _id: string;
    _type: "miniServiceGroup";
    title: string;
    items: MiniService[];
}
