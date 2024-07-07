import { query } from "@/lib/sanity";
import { PortfolioPage, portfolioPageFragment } from "@/lib/types";

export async function usePortfolioPage(): Promise<PortfolioPage> {
    return await query(
        `*[_type == "portfolioPage"][0] {
            ${portfolioPageFragment}
        }`,
        {},
        ["portfolioPage"],
    );
}
