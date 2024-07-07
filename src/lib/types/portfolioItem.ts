import {
    ComposeIcon,
    LaunchIcon,
    PresentationIcon,
    CogIcon,
} from "@sanity/icons";
import { defineType } from "sanity";

import { Testimonial, testimonialFragment } from "./components/testimonial";
import { MultiMedia, SanityImage, assetFragment } from "./objects/assets";
import { RichText } from "./objects/richText";
import { Service, serviceFragment } from "./service";

export const portfolioItemSchema = defineType({
    name: "portfolioItem",
    title: "Portfolio Item",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
            icon: ComposeIcon,
        },
        {
            name: "hero",
            title: "Hero",
            icon: PresentationIcon,
        },
        {
            name: "references",
            title: "References",
            icon: LaunchIcon,
        },
        {
            name: "settings",
            title: "Settings",
            icon: CogIcon,
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        {
            name: "shortTitle",
            title: "Short Title",
            type: "string",
            group: "content",
        },
        {
            name: "date",
            title: "Date",
            type: "date",
            group: "content",
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            group: "content",
        },
        {
            name: "description",
            title: "Description",
            type: "richText",
            group: "content",
        },
        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "content",
        },
        {
            name: "heroType",
            title: "Hero Type",
            type: "string",
            options: {
                list: [
                    { title: "Media", value: "media" },
                    { title: "Video Embed", value: "embed" },
                ],
                layout: "radio",
            },
            initialValue: "media",
            group: "hero",
        },
        {
            name: "heroMedia",
            title: "Media",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "hero",
            hidden: ({ parent }) => parent?.heroType !== "media",
        },
        {
            name: "heroEmbed",
            title: "Video Embed",
            type: "url",
            group: "hero",
            hidden: ({ parent }) => parent?.heroType !== "embed",
        },
        {
            name: "serviceReference",
            title: "Service Reference",
            type: "reference",
            to: [{ type: "service" }],
            group: "references",
        },
        {
            name: "testimonial",
            title: "Testimonial",
            type: "reference",
            to: [{ type: "testimonial" }],
            group: "references",
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
            group: "references",
        },
        {
            name: "thumbnail",
            title: "Thumbnail",
            type: "image",
            group: "settings",
        },
        {
            name: "hidden",
            title: "Hidden",
            type: "boolean",
            initialValue: false,
            group: "settings",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
            group: "settings",
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
