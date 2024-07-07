import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";
import { RichText } from "../objects/richText";

export const miniServiceSchema = defineType({
    name: "miniService",
    title: "Mini Service",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "photo",
            title: "Photo",
            type: "image",
        },
        {
            name: "description",
            title: "Description",
            type: "richText",
        },
        {
            name: "buttonText",
            title: "Button Text",
            type: "string",
            initialValue: "Learn More",
        },
    ],
});

export const miniServiceFragment = `
    _id,
    _type,
    title,
    photo {
        ${assetFragment}
    },
    description,
    buttonText
`;

export interface MiniService {
    _id: string;
    _type: "miniService";
    title: string;
    photo: SanityImage;
    description: RichText;
    buttonText: string;
}
