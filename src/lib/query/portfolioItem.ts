import { query } from "@/lib/sanity";
import {
    PortfolioItem,
    portfolioItemPartialFragment,
    portfolioItemFragment,
} from "@/lib/types";

export async function usePortfolioItems(): Promise<PortfolioItem[]> {
    return await query(
        `*[_type == "portfolioItem"] | order(date desc) {
            ${portfolioItemPartialFragment}
        }`,
        {},
        ["portfolioItem"],
    );
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await query(
        `*[_type == "portfolioItem" && slug.current == $slug][0] {
            ${portfolioItemFragment}
        }`,
        { slug },
        ["portfolioItem", "service", "testimonial"],
    );
}
