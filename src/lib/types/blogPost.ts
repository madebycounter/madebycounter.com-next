import { client } from "@/lib/sanity";

import { MultiMedia, MuxVideo, SanityImage, assetFragment } from "./assets";
import { TeamMember, teamMemberFragment } from "./components/teamMember";

export type BlogPostContent = {
    references: {
        _key: string;
        _type: string;
    };
    blocks: any[];
    media: MultiMedia[];
    galleries: {
        _key: string;
        items: SanityImage[];
    }[];
};

export interface BlogPost {
    _id: string;
    _type: "blogPost";
    title: string;
    date: string;
    author: TeamMember;
    heroImage: SanityImage;
    heroVideo: MuxVideo;
    content: BlogPostContent;
    seoDescription: string;
    slug: {
        current: string;
    };
}

export const blogPostFragment = `
    _id,
    _type,
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
    "content": {
        "references": content[] {
            _key,
            _type
        },
        "blocks": content[_type=="block"] {
            _key,
            ...
        },
        "media": content[_type=="image" || _type=="mux.video"] {
            _key,
            ${assetFragment}
        },
        "blogPostGalleries": content[_type=="blogPostGallery"] {
            _key,
            items[] {
                ${assetFragment}
            }
        }
    },
    seoDescription,
    slug
`;

export async function useBlogPost(slug: string): Promise<BlogPost> {
    return await client.fetch(
        `
        *[_type == "blogPost" && slug.current == $slug] {
            ${blogPostFragment}
        }[0]`,
        { slug },
    );
}

export async function useBlogPosts(): Promise<BlogPost[]> {
    return await client.fetch(
        `*[_type == "blogPost"] | order(date desc) {
            _id,
            _type,
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
            seoDescription,
            slug
        }`,
    );
}
