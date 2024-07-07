import { stegaClean } from "@sanity/client/stega";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export interface SocialIconProps {
    className?: string;
    platform?:
        | "instagram"
        | "facebook"
        | "twitter"
        | "linkedin"
        | "youtube"
        | "email"
        | "github";
}

export default function SocialIcon({ platform, className }: SocialIconProps) {
    const iconMap = {
        instagram: FaInstagram,
        facebook: FaFacebook,
        twitter: FaXTwitter,
        linkedin: FaLinkedinIn,
        youtube: FaYoutube,
        email: FaRegEnvelope,
        github: FaGithub,
    };

    const Icon = iconMap[stegaClean(platform) || "instagram"];

    return <Icon className={className} />;
}
