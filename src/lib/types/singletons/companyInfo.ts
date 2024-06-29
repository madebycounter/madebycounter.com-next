import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../assets";
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
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "name",
                            title: "Name",
                            type: "string",
                        },
                        {
                            name: "link",
                            title: "Link",
                            type: "string",
                        },
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Instagram", value: "instagram" },
                                    { title: "Facebook", value: "facebook" },
                                    { title: "Twitter", value: "twitter" },
                                    { title: "LinkedIn", value: "linkedin" },
                                    { title: "E-Mail", value: "email" },
                                    { title: "YouTube", value: "youtube" },
                                    { title: "GitHub", value: "github" },
                                ],
                            },
                        },
                    ],
                    preview: {
                        select: {
                            title: "name",
                            platform: "platform",
                        },
                        prepare({ title, platform }) {
                            var icon = FaInstagram;

                            if (platform === "facebook") icon = FaFacebook;
                            else if (platform === "twitter") icon = FaXTwitter;
                            else if (platform === "linkedin")
                                icon = FaLinkedinIn;
                            else if (platform === "youtube") icon = FaYoutube;
                            else if (platform === "email") icon = FaRegEnvelope;
                            else if (platform === "github") icon = FaGithub;

                            return {
                                title,
                                icon,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: "footerLinks",
            title: "Footer Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "text",
                            title: "Link Text",
                            type: "string",
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "string",
                        },
                        {
                            name: "external",
                            title: "External",
                            type: "boolean",
                            initialValue: true,
                        },
                    ],
                },
            ],
        },
    ],
});

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
