import { query } from "@/lib/sanity";
import { AboutPage, aboutPageFragment } from "@/lib/types";

export async function useAboutPage(): Promise<AboutPage> {
    return await query(
        `*[_type == "aboutPage"][0] {
            ${aboutPageFragment}
        }`,
        {},
        ["aboutPage", "service", "teamMember"],
    );
}
