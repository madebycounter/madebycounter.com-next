import { defineType } from "sanity";

import { MultiMedia, SanityImage, assetFragment } from "./assets";
import { Testimonial, testimonialFragment } from "./components/testimonial";
import { RichText } from "./richText";
import { Service, serviceFragment } from "./service";

export const portfolioItemSchema = defineType({
    name: "portfolioItem",
    title: "Portfolio Item",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "shortTitle",
            title: "Short Title",
            type: "string",
        },
        {
            name: "date",
            title: "Date",
            type: "date",
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "description",
            title: "Description",
            type: "richText",
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
        },
        {
            name: "heroMedia",
            title: "Hero Media",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
        },
        {
            name: "heroEmbed",
            title: "Hero Video Embed",
            type: "url",
        },
        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
        },
        {
            name: "serviceReference",
            title: "Service Reference",
            type: "reference",
            to: [{ type: "service" }],
        },
        {
            name: "testimonial",
            title: "Testimonial",
            type: "reference",
            to: [{ type: "testimonial" }],
        },
        {
            name: "relatedProjects",
            title: "Related Projects",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "portfolioItem" }],
                },
            ],
        },
        {
            name: "hidden",
            title: "Hidden",
            type: "boolean",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
        },
    ],
    preview: {
        select: {
            title: "title",
            hidden: "hidden",
            media: "thumbnail",
        },
        prepare({ title, hidden, media }) {
            return {
                title,
                subtitle: hidden ? "Hidden" : "",
                media,
            };
        },
    },
});

export interface PortfolioItem {
    _id: string;
    _type: "portfolioItem";
    _updatedAt: string;
    title: string;
    date: string;
    tags: string[];
    description: RichText;
    thumbnail: SanityImage;
    heroMedia: MultiMedia[];
    heroEmbed: string;
    gallery: MultiMedia[];
    serviceReference: Service;
    testimonial: Testimonial;
    relatedProjects: PortfolioItem[];
    hidden: boolean;
    slug: { current: string };
}

export const portfolioItemPartialFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    date,
    tags,
    thumbnail {
        ${assetFragment}
    },
    slug,
    hidden
`;

export const portfolioItemFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    description,
    date,
    thumbnail {
        ${assetFragment}
    },
    heroMedia[] {
        _key,
        ${assetFragment}
    },
    heroEmbed,
    gallery[] {
        _key,
        ${assetFragment}
    },
    serviceReference->{
        ${serviceFragment}
    },
    testimonial->{
        ${testimonialFragment}
    },
    relatedProjects[]->{
        _id,
        _type,
        title,
        date,
        tags,
        thumbnail {
            ${assetFragment}
        },
        slug,
        hidden,
    },
    tags[],
    slug,
    hidden,
`;
