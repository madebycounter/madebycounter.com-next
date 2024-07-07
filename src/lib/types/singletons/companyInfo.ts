import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";
import { FooterLink, footerLinkFragment } from "../objects/footerLink";
import { SocialLink, socialLinkFragment } from "../objects/socialLink";
import { PortfolioItem } from "../portfolioItem";
import { Service } from "../service";

export const companyInfoSchema = defineType({
    name: "companyInfo",
    title: "Company Info",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "logo",
            title: "Logo",
            type: "image",
        },
        {
            name: "socials",
            title: "Socials",
            type: "array",
            of: [{ type: "socialLink" }],
        },
        {
            name: "footerLinks",
            title: "Footer Links",
            type: "array",
            of: [{ type: "footerLink" }],
        },
    ],
});

export interface CompanyInfo {
    _id: string;
    _type: "companyInfo";
    name: string;
    logo: SanityImage;
    socials: SocialLink[];
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
        ${socialLinkFragment}
    },
    footerLinks[] {
        ${footerLinkFragment}
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
