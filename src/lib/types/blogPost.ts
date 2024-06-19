import { query } from "@/lib/sanity";

import { MuxVideo, SanityImage, assetFragment } from "./assets";
import { TeamMember, teamMemberFragment } from "./components/teamMember";

export interface BlogPost {
    _id: string;
    _type: "blogPost";
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

export async function useBlogPost(slug: string): Promise<BlogPost> {
    return await query(
        `
        *[_type == "blogPost" && slug.current == $slug] {
            ${blogPostFragment}
        }[0]`,
        { slug },
        ["teamMember", "blogPost"],
    );
}

export async function useBlogPosts(): Promise<BlogPost[]> {
    return await query(
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
        {},
        ["teamMember", "blogPost"],
    );
}
