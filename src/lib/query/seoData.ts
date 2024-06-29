import { query } from "@/lib/sanity";
import { SeoData, seoDataFragment } from "@/lib/types";

export async function useSeoData(): Promise<SeoData> {
    return await query(
        `
        *[_type == "seoData"][0] {
            ${seoDataFragment}
        }
    `,
        {},
        ["seoData"],
    );
}
