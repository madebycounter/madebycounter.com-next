import { createClient } from "next-sanity";

import {
    CompanyInfo,
    PortfolioItem,
    TeamMember,
    TeamMemberSlug,
} from "./sanity.types";

export const client = createClient({
    apiVersion: "2024-06-03",
    projectId: "ff27s74x",
    dataset: "production",
    useCdn: false,
});

export async function useCompanyInfo(): Promise<CompanyInfo> {
    return await client.fetch(`*[_type == "companyInfo"][0] {
        name,
        logo {
            ...,
            asset-> {
                ...
            }
        },
    }`);
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await client.fetch(
        `
        *[_type == "portfolioItem" && slug.current == $slug][0] {
            title,
            description,
            thumbnail {
                ...,
                asset-> {
                    ...
                }
            },
            cover {
                ...,
                asset-> {
                    ...
                }
            },
            gallery[] {
                ...,
                asset-> {
                    ...
                }
            },
            slug,
        }
    `,
        { slug },
    );
}

export async function useTeamMember(slug: TeamMemberSlug): Promise<TeamMember> {
    return await client.fetch(
        `
        *[_type == "teamMember" && slug.current == $slug][0] {
            name,
            profile {
                ...,
                asset-> {
                    ...
                }
            },
            actionShot {
                ...,
                asset-> {
                    ...
                }
            },
            actionShotExtra {
                ...,
                asset-> {
                    ...
                }
            },
            signature {
                ...,
                asset-> {
                    ...
                }
            },
            slug,
        }`,
        {
            slug,
        },
    );
}
