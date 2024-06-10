import { createClient } from "next-sanity";

import {
    AboutPage,
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

export async function usePortfolioItems(): Promise<PortfolioItem[]> {
    return await client.fetch(`
        *[_type == "portfolioItem"] | order(date desc) {
            title,
            description,
            date,
            thumbnail {
                ...,
                asset-> {
                    ...
                }
            },
            heroMedia[] {
                ...,
                asset-> {
                    ...
                }
            },
            heroEmbed,
            gallery[] {
                ...,
                asset-> {
                    ...
                }
            },
            tags[],
            slug,
            hidden,
        }
    `);
}

export async function usePortfolioItem(slug: string): Promise<PortfolioItem> {
    return await client.fetch(
        `
        *[_type == "portfolioItem" && slug.current == $slug][0] {
            title,
            description,
            date,
            thumbnail {
                ...,
                asset-> {
                    ...
                }
            },
            heroMedia[] {
                ...,
                asset-> {
                    ...
                }
            },
            heroEmbed,
            gallery[] {
                ...,
                asset-> {
                    ...
                }
            },
            tags[],
            slug,
            hidden,
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

export async function useAboutPage(): Promise<AboutPage> {
    return await client.fetch(`*[_type == "aboutPage"][0] {
        lukeSlideshow1[] {
            ...,
            asset-> {
                ...
            }
        },
        lukeSlideshow2[] {
            ...,
            asset-> {
                ...
            }
        },
        henrySlideshow1[] {
            ...,
            asset-> {
                ...
            }
        },
        henrySlideshow2[] {
            ...,
            asset-> {
                ...
            }
        },
        williamSlideshow1[] {
            ...,
            asset-> {
                ...
            }
        },
        williamSlideshow2[] {
            ...,
            asset-> {
                ...
            }
        }
    }`);
}
