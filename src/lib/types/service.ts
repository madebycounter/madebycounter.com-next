import { defineType } from "sanity";

import { query } from "@/lib/sanity";

import { MultiMedia, MuxVideo, assetFragment } from "./assets";
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
import { RichText } from "./richText";
import { PageSeoData, pageSeoDataFragment } from "./singletons/seoData";

export const serviceSchema = defineType({
    name: "service",
    title: "Service",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slideshow",
            title: "Slideshow",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
        },
        {
            name: "videoSnippet",
            title: "Video Snippet",
            type: "mux.video",
        },
        {
            name: "videoEmbed",
            title: "Video Embed",
            type: "url",
        },
        {
            name: "heroText",
            title: "Hero Text",
            type: "richText",
        },
        {
            name: "teamMember",
            title: "Team Member",
            type: "reference",
            to: [{ type: "teamMember" }],
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
        },
        {
            name: "callToAction",
            title: "Call to Action",
            type: "string",
        },
        {
            name: "offerings",
            title: "Offerings",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "seoData",
            title: "SEO Data",
            type: "pageSeoData",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
        },
    ],
    preview: {
        select: {
            title: "title",
            slideshow: "slideshow",
        },
        prepare(selection) {
            const { title, slideshow } = selection;
            return {
                title,
                media: slideshow.filter(
                    (slide: any) => slide._type === "image",
                )[0],
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
    title: string;
    slideshow: MultiMedia[];
    videoSnippet: MuxVideo;
    videoEmbed: string;
    heroText: RichText;
    teamMember: TeamMember;
    content: ServiceContent;
    callToAction: string;
    offerings: string[];
    seoData: PageSeoData;
    slug: { current: string };
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
    videoSnippet {
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
    offerings[],
    seoData {
        ${pageSeoDataFragment}
    },
    slug,
`;
