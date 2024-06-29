import { defineType } from "sanity";

import { MuxVideo, SanityImage, assetFragment } from "./assets";
import { TeamMember, teamMemberFragment } from "./components/teamMember";

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
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "date",
            title: "Date",
            type: "date",
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "teamMember" }],
        },
        {
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "heroVideo",
            title: "Hero Video",
            type: "mux.video",
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
        },
        {
            name: "seoDescription",
            title: "SEO Description",
            type: "text",
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
            date: "date",
            media: "heroImage",
        },
        prepare({ title, date, media }) {
            return {
                title,
                subtitle: date,
                media,
            };
        },
    },
});

export interface BlogPost {
    _id: string;
    _type: "blogPost";
    _updatedAt: string;
    title: string;
    date: string;
    author: TeamMember;
    heroImage: SanityImage;
    heroVideo: MuxVideo;
    content: any;
    seoDescription: string;
    allContent: any;
    slug: {
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
