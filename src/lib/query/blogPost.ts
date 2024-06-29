import { query } from "@/lib/sanity";
import {
    BlogPost,
    blogPostFragment,
    teamMemberFragment,
    assetFragment,
} from "@/lib/types";

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
            seoDescription,
            slug
        }`,
        {},
        ["teamMember", "blogPost"],
    );
}
