import { FaGithub } from "react-icons/fa";
import {
    FaYoutube,
    FaInstagram,
    FaLinkedinIn,
    FaRegEnvelope,
    FaFacebook,
    FaXTwitter,
} from "react-icons/fa6";
import { defineType } from "sanity";

export const socialLinkSchema = defineType({
    name: "socialLink",
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
            subtitle: "link",
        },
        prepare({ title, platform, subtitle }) {
            var icon = FaInstagram;

            if (platform === "facebook") icon = FaFacebook;
            else if (platform === "twitter") icon = FaXTwitter;
            else if (platform === "linkedin") icon = FaLinkedinIn;
            else if (platform === "youtube") icon = FaYoutube;
            else if (platform === "email") icon = FaRegEnvelope;
            else if (platform === "github") icon = FaGithub;

            return {
                title,
                subtitle,
                icon,
            };
        },
    },
});

export const socialLinkFragment = `
    name,
    link,
    platform,
`;

export interface SocialLink {
    name?: string;
    link?: string;
    platform?:
        | "instagram"
        | "facebook"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "email"
        | "github";
}
