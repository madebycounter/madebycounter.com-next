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
            title: "Company Name",
            type: "string",
        },
        {
            name: "titleFormat",
            title: "Title Format",
            description:
                "The format for the page title. Use {title} to insert the page title.",
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
    name?: string;
    titleFormat?: string;
    logo?: SanityImage;
    socials?: SocialLink[];
    footerLinks?: FooterLink[];
    services?: Service[];
    recent?: PortfolioItem[];
}

export const companyInfoFragment = `
    _id,
    _type,
    name,
    titleFormat,
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
        slug,
        hidden
    },
    "recent": *[_type=="portfolioItem"] | order(date desc) {
        title,
        slug
    }[0...5]
`;
