import { defineType } from "sanity";

import { MultiMedia, assetFragment } from "../objects/assets";

export const mediaGroupSchema = defineType({
    name: "mediaGroup",
    title: "Media Group",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "items",
            title: "Media",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
        },
    ],
    preview: {
        select: {
            title: "title",
            gallery: "items",
        },
        prepare({ title, gallery }) {
            return {
                title,
                media: gallery.filter(
                    (asset: any) => asset._type === "image",
                )[0],
            };
        },
    },
});

export const mediaGroupFragment = `
    _id,
    _type,
    title,
    items[] {
        _key,
        ${assetFragment}
    },
`;

export interface MediaGroup {
    _id: string;
    _type: "mediaGroup";
    title: string;
    items: MultiMedia[];
}
