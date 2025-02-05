import { ComposeIcon, CogIcon, PresentationIcon } from "@sanity/icons";
import { defineType } from "sanity";

import videoThumbnail from "@/lib/sanity/preview/videoThumbnail";

import { FunFact, funFactFragment } from "./components/funFact";
import { TeamMember, teamMemberFragment } from "./components/teamMember";
import { Testimonial, testimonialFragment } from "./components/testimonial";
import { MediaGroup, mediaGroupFragment } from "./groups/mediaGroup";
import {
    MiniServiceGroup,
    miniServiceGroupFragment,
} from "./groups/miniServiceGroup";
import {
    PortfolioItemGroup,
    portfolioItemGroupFragment,
} from "./groups/portfolioItemGroup";
import { MultiMedia, MuxVideo, assetFragment } from "./objects/assets";
import { RichText } from "./objects/richText";
import { PageSeoData, pageSeoDataFragment } from "./singletons/seoData";

export const serviceSchema = defineType({
    name: "service",
    title: "Service",
    type: "document",
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
            icon: ComposeIcon,
        },
        {
            name: "hero",
            title: "Hero",
            icon: PresentationIcon,
        },
        {
            name: "settings",
            title: "Settings",
            icon: CogIcon,
        },
    ],
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        {
            name: "teamMember",
            title: "Team Member",
            type: "reference",
            to: [{ type: "teamMember" }],
            group: "content",
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "testimonial", title: "Testimonial" },
                        { type: "funFact", title: "Fun Fact" },
                        {
                            type: "miniServiceGroup",
                            title: "Mini Service Group",
                        },
                        { type: "mediaGroup", title: "Media Group" },
                        {
                            type: "portfolioItemGroup",
                            title: "Portfolio Group",
                        },
                    ],
                },
            ],
            group: "content",
        },
        {
            name: "slideshow",
            title: "Gallery",
            description:
                "Used in various places requiring media related to this service.",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "content",
        },
        {
            name: "heroText",
            title: "Hero Text",
            type: "richText",
            group: "hero",
        },
        {
            name: "callToAction",
            title: "Call to Action",
            type: "string",
            group: "hero",
        },
        {
            name: "videoEmbed",
            title: "Hero Video",
            type: "url",
            group: "hero",
        },
        {
            name: "seoData",
            title: "SEO Data",
            type: "pageSeoData",
            group: "settings",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
            group: "settings",
        },
        {
            name: "hidden",
            title: "Hidden",
            type: "boolean",
            initialValue: false,
            group: "settings",
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "slideshow.0",
            mediaVid: "slideshow.0.asset.playbackId",
        },
        prepare(selection) {
            const { title, media, mediaVid } = selection;
            return {
                title,
                media:
                    media._type === "mux.video"
                        ? videoThumbnail(mediaVid)
                        : media,
            };
        },
    },
});

export type ServiceContent = {
    references: { _id: string; _type: string }[];
    funFacts: FunFact[];
    testimonials: Testimonial[];
    mediaGroups: MediaGroup[];
    miniServiceGroups: MiniServiceGroup[];
    portfolioItemGroups: PortfolioItemGroup[];
};

export interface Service {
    _id: string;
    _type: "service";
    _updatedAt: string;
    title?: string;
    slideshow?: MultiMedia[];
    videoEmbed?: string;
    heroText?: RichText;
    teamMember?: TeamMember;
    content?: ServiceContent;
    callToAction?: string;
    seoData: PageSeoData;
    slug?: { current: string };
    hidden?: boolean;
}

export const serviceFragment = `
    _id,
    _type,
    _updatedAt,
    title,
    slideshow[] {
        _key,
        ${assetFragment}
    },
    videoEmbed,
    heroText,
    teamMember->{
        ${teamMemberFragment}
    },
    "content": {
        "references": content[]->{
            _id,
            _type,
        },
        "funFacts": content[@->_type=="funFact"]->{
            ${funFactFragment}
        },
        "testimonials": content[@->_type=="testimonial"]->{
            ${testimonialFragment}
        },
        "mediaGroups": content[@->_type=="mediaGroup"]->{
            ${mediaGroupFragment}
        },
        "miniServiceGroups": content[@->_type=="miniServiceGroup"]->{
            ${miniServiceGroupFragment}
        },
        "portfolioItemGroups": content[@->_type=="portfolioItemGroup"]->{
            ${portfolioItemGroupFragment}
        }
    },
    callToAction,
    seoData {
        ${pageSeoDataFragment}
    },
    slug,
    hidden
`;
