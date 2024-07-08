import { ComposeIcon, PresentationIcon, CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

import videoThumbnail from "@/lib/sanity/preview/videoThumbnail";

import { TeamMember, teamMemberFragment } from "./components/teamMember";
import { MuxVideo, SanityImage, assetFragment } from "./objects/assets";

export const blogPostGallerySchema = defineType({
    name: "blogPostGallery",
    title: "Blog Post Gallery",
    type: "document",
    fields: [
        {
            name: "items",
            title: "Gallery Images",
            type: "array",
            of: [{ type: "image" }],
        },
    ],
    components: {
        // preview: BlogPostGallery,
    },

    preview: {
        select: {
            images: "items",
        },
    },
});

export const blogPostSchema = defineType({
    name: "blogPost",
    title: "Blog Post",
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
            name: "date",
            title: "Date",
            type: "date",
            group: "content",
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "teamMember" }],
            group: "content",
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                },
                {
                    type: "image",
                    title: "Image",
                },
                {
                    type: "mux.video",
                    title: "Video",
                },
                {
                    type: "blogPostGallery",
                    title: "Gallery",
                },
                {
                    type: "code",
                    title: "Code",
                },
            ],
            group: "content",
        },
        {
            name: "heroType",
            title: "Hero Type",
            type: "string",
            options: {
                list: [
                    { title: "Image", value: "image" },
                    { title: "Video", value: "video" },
                ],
                layout: "radio",
            },
            initialValue: "image",
            group: "hero",
        },
        {
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: {
                hotspot: true,
            },
            group: "hero",
            hidden: ({ parent }) => parent?.heroType !== "image",
        },
        {
            name: "heroVideo",
            title: "Hero Video",
            type: "mux.video",
            group: "hero",
            hidden: ({ parent }) => parent?.heroType !== "video",
        },
        {
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
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
            date: "date",
            media: "heroImage",
            mediaVid: "heroVideo.asset.playbackId",
        },
        prepare({ title, date, media, mediaVid }) {
            return {
                title,
                subtitle: date,
                media: media ? media : videoThumbnail(mediaVid),
            };
        },
    },
});

export interface BlogPost {
    _id: string;
    _type: "blogPost";
    _updatedAt: string;
    title?: string;
    date?: string;
    author?: TeamMember;
    heroImage?: SanityImage;
    heroVideo?: MuxVideo;
    content?: any;
    seoDescription?: string;
    slug?: {
        current: string;
    };
}

export const blogPostFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    date,
    author->{
        ${teamMemberFragment}
    },
    heroImage {
        ${assetFragment}
    },
    heroVideo {
        ${assetFragment}
    },
    content[] {
        ...,
        items[] {
            ${assetFragment}
        },
        ${assetFragment}
    },
    seoDescription,
    slug
`;
