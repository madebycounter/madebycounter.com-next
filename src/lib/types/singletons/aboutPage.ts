import { UserIcon, PresentationIcon, CogIcon } from "@sanity/icons";
import { defineType } from "sanity";

import { Service } from "@/lib/types/service";

import { TeamMember, teamMemberFragment } from "../components/teamMember";
import { MultiMedia, assetFragment } from "../objects/assets";
import { PortfolioItem, portfolioItemPartialFragment } from "../portfolioItem";

export const aboutPageSchema = defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    groups: [
        {
            name: "luke",
            title: "Luke",
            default: true,
            icon: UserIcon,
        },
        {
            name: "henry",
            title: "Henry",
            icon: UserIcon,
        },
        {
            name: "william",
            title: "William",
            icon: UserIcon,
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
            name: "hero",
            title: "Hero",
            type: "object",
            fields: [
                {
                    name: "row1",
                    title: "Row 1",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row2",
                    title: "Row 2",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row3",
                    title: "Row 3",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row4",
                    title: "Row 4",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row5",
                    title: "Row 5",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row6",
                    title: "Row 6",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
                {
                    name: "row7",
                    title: "Row 7",
                    type: "array",
                    of: [
                        { type: "image", title: "Image" },
                        { type: "mux.video", title: "Video" },
                    ],
                    options: {
                        layout: "grid",
                    },
                },
            ],
            group: "hero",
        },
        {
            name: "lukeSlideshow1",
            title: "Luke Slideshow 1",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "luke",
        },
        {
            name: "lukeSlideshow2",
            title: "Luke Slideshow 2",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "luke",
        },
        {
            name: "lukeReferences",
            title: "Luke References",
            type: "array",
            of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
            group: "luke",
        },
        {
            name: "henrySlideshow1",
            title: "Henry Slideshow 1",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "henry",
        },
        {
            name: "henrySlideshow2",
            title: "Henry Slideshow 2",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "henry",
        },
        {
            name: "henryReferences",
            title: "Henry References",
            type: "array",
            of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
            group: "henry",
        },
        {
            name: "williamSlideshow1",
            title: "William Slideshow 1",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "william",
        },
        {
            name: "williamSlideshow2",
            title: "William Slideshow 2",
            type: "array",
            of: [
                { type: "image", title: "Image" },
                { type: "mux.video", title: "Video" },
            ],
            options: {
                layout: "grid",
            },
            group: "william",
        },
        {
            name: "williamReferences",
            title: "William References",
            type: "array",
            of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
            group: "william",
        },
        {
            name: "title",
            title: "Page Title",
            type: "string",
            group: "settings",
        },
        {
            name: "description",
            title: "SEO Description",
            type: "text",
            group: "settings",
        },
        {
            name: "image",
            title: "SEO Image",
            type: "image",
            group: "settings",
        },
    ],
    preview: {
        prepare() {
            return {
                title: "About Page",
            };
        },
    },
});

export interface AboutPageHero {
    row1: MultiMedia[];
    row2: MultiMedia[];
    row3: MultiMedia[];
    row4: MultiMedia[];
    row5: MultiMedia[];
    row6: MultiMedia[];
    row7: MultiMedia[];
}

export interface AboutPage {
    _id: string;
    _type: "aboutPage";
    hero: AboutPageHero;
    luke: TeamMember;
    henry: TeamMember;
    william: TeamMember;
    lukeService: Service;
    henryService: Service;
    williamService: Service;
    lukeSlideshow1: MultiMedia[];
    lukeSlideshow2: MultiMedia[];
    lukeReferences: PortfolioItem[];
    henrySlideshow1: MultiMedia[];
    henrySlideshow2: MultiMedia[];
    henryReferences: PortfolioItem[];
    williamSlideshow1: MultiMedia[];
    williamSlideshow2: MultiMedia[];
    williamReferences: PortfolioItem[];
}

export const aboutPageFragment = `
    _id,
    _type,
    hero {
        row1[] {
            ${assetFragment}
        },
        row2[] {
            ${assetFragment}
        },
        row3[] {
            ${assetFragment}
        },
        row4[] {
            ${assetFragment}
        },
        row5[] {
            ${assetFragment}
        },
        row6[] {
            ${assetFragment}
        },
        row7[] {
            ${assetFragment}
        }
    },
    "luke": *[_type=="teamMember" && slug.current == "luke-a-makinson"][0] {
        ${teamMemberFragment}
    },
    "henry": *[_type=="teamMember" && slug.current == "henry-buck"][0] {
        ${teamMemberFragment}
    },
    "william": *[_type=="teamMember" && slug.current == "william-gardner"][0] {
        ${teamMemberFragment}
    },
    "lukeService": *[_type=="service" && slug.current == "videography"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
    },
    "henryService": *[_type=="service" && slug.current == "photography"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
    },
    "williamService": *[_type=="service" && slug.current == "drone-piloting"][0] {
        slideshow[] {
            ${assetFragment}
        },
        slug
    },
    lukeSlideshow1[] {
        _key,
        ${assetFragment}
    },
    lukeSlideshow2[] {
        _key,
        ${assetFragment}
    },
    lukeReferences[]->{
        ${portfolioItemPartialFragment}
    },
    henrySlideshow1[] {
        _key,
        ${assetFragment}
    },
    henrySlideshow2[] {
        _key,
        ${assetFragment}
    },
    henryReferences[]->{
        ${portfolioItemPartialFragment}
    },
    williamSlideshow1[] {
        _key,
        ${assetFragment}
    },
    williamSlideshow2[] {
        _key,
        ${assetFragment}
    },
    williamReferences[]->{
        ${portfolioItemPartialFragment}
    }
`;
