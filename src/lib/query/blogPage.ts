import { query } from "@/lib/sanity";
import { BlogPage, blogPageFragment } from "@/lib/types";

export async function useBlogPage(): Promise<BlogPage> {
    return await query(
        `*[_type == "blogPage"][0] {
            ${blogPageFragment}
        }`,
        {},
        ["blogPage"],
    );
}
