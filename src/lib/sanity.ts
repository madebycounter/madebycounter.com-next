import { createClient } from "next-sanity";

import {
    AboutPage,
    CompanyInfo,
    PortfolioItem,
    Service,
    TeamMember,
    TeamMemberSlug,
    aboutPageFragment,
    companyInfoFragment,
    portfolioItemFragment,
    serviceFragment,
    teamMemberFragment,
} from "@/lib/types";

export const client = createClient({
    apiVersion: "2024-06-03",
    projectId: "ff27s74x",
    dataset: "production",
    useCdn: false,
});

export async function useCompanyInfo(): Promise<CompanyInfo> {
    return await client.fetch(`*[_type == "companyInfo"][0] {
        ${companyInfoFragment}
    }`);
}

export async function usePortfolioItems(): Promise<PortfolioItem[]> {
    return await client.fetch(`*[_type == "portfolioItem"] | order(date desc) {
        ${portfolioItemFragment}
    }`);
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await client.fetch(
        `*[_type == "portfolioItem" && slug.current == $slug][0] {
            ${portfolioItemFragment}
        }`,
        { slug },
    );
}

export async function useTeamMember(slug: TeamMemberSlug): Promise<TeamMember> {
    return await client.fetch(
        `*[_type == "teamMember" && slug.current == $slug][0] {
            ${teamMemberFragment}
        }`,
        { slug },
    );
}

export async function useAboutPage(): Promise<AboutPage> {
    return await client.fetch(
        `*[_type == "aboutPage"][0] {
            ${aboutPageFragment}
        }`,
    );
}

export async function useServices(): Promise<Service[]> {
    return await client.fetch(`*[_type == "service"] {
        ${serviceFragment}
    }`);
}

export async function useService(slug: string): Promise<Service> {
    return await client.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
            ${serviceFragment}
        }`,
        { slug },
    );
}
