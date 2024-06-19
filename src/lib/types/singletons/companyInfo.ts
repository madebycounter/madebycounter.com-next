import { query } from "@/lib/sanity";

import { SanityImage, assetFragment } from "../assets";
import { PortfolioItem } from "../portfolioItem";
import { Service } from "../service";

export interface Social {
    platform:
        | "instagram"
        | "facebook"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "email"
        | "github";
    link: string;
}

export interface FooterLink {
    text: string;
    url: string;
    external: boolean;
}

export interface CompanyInfo {
    _id: string;
    _type: "companyInfo";
    name: string;
    logo: SanityImage;
    socials: Social[];
    footerLinks: FooterLink[];
    services: Service[];
    recent: PortfolioItem[];
}

export const companyInfoFragment = `
    _id,
    _type,
    name,
    logo {
        ${assetFragment}
    },
    socials[] {
        platform,
        link
    },
    footerLinks[] {
        text,
        url,
        external
    },
    "services": *[_type=="service"] {
        title,
        slug
    },
    "recent": *[_type=="portfolioItem"] | order(date desc) {
        title,
        slug
    }[0...5]
`;

export async function useCompanyInfo(): Promise<CompanyInfo> {
    return await query(
        `*[_type == "companyInfo"][0] {
        ${companyInfoFragment}
    }`,
        {},
        ["companyInfo", "service", "portfolioItem"],
    );
}
