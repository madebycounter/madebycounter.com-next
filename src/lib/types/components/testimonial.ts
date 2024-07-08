import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";
import { RichText } from "../objects/richText";

export const testimonialSchema = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "jobTitle",
            title: "Job Title",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "quote",
            title: "Quote",
            type: "richText",
        },
        {
            name: "photo",
            title: "Photo",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "photoBackground",
            title: "Photo With Background",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "rating",
            title: "Rating",
            type: "number",
            initialValue: 5,
            options: {
                list: [
                    {
                        value: 1,
                        title: "★",
                    },
                    {
                        value: 2,
                        title: "★★",
                    },
                    {
                        value: 3,
                        title: "★★★",
                    },
                    {
                        value: 4,
                        title: "★★★★",
                    },
                    {
                        value: 5,
                        title: "★★★★★",
                    },
                ],
            },
        },
    ],
    preview: {
        select: {
            title: "name",
            quote: "quote",
            media: "photo",
        },
        prepare({ title, quote, media }) {
            const block = (quote || []).find(
                (block: any) => block._type === "block",
            );
            return {
                title,
                subtitle: block
                    ? block.children
                          .filter((child: any) => child._type === "span")
                          .map((span: any) => span.text)
                          .join("")
                    : "",
                media,
            };
        },
    },
});

export const testimonialFragment = `
    _id,
    _type,
    name,
    jobTitle,
    quote,
    photo {
        ${assetFragment}
    },
    photoBackground {
        ${assetFragment}
    },
    rating
`;

export interface Testimonial {
    _id: string;
    _type: "testimonial";
    name?: string;
    jobTitle?: string[];
    quote?: RichText;
    photo?: SanityImage;
    photoBackground?: SanityImage;
    rating: 1 | 2 | 3 | 4 | 5;
}
