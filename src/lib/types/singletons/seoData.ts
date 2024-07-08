import { defineType } from "sanity";

import { SanityImage, assetFragment } from "../objects/assets";

export const pageSeoDataSchema = defineType({
    name: "pageSeoData",
    title: "Page SEO Data",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
        },
    ],
});

export const seoDataSchema = defineType({
    name: "seoData",
    title: "SEO Data",
    type: "document",
    fields: [
        {
            name: "companyName",
            title: "Company Name",
            type: "string",
        },
        {
            name: "aboutPageSeo",
            title: "About Page",
            type: "pageSeoData",
        },
        {
            name: "servicesPageSeo",
            title: "Services Page",
            type: "pageSeoData",
        },
        {
            name: "portfolioPageSeo",
            title: "Portfolio Page",
            type: "pageSeoData",
        },
        {
            name: "blogPageSeo",
            title: "Blog Page",
            type: "pageSeoData",
        },
    ],
});

export interface PageSeoData {
    _id: string;
    _type: "pageSeoData";
    title?: string;
    description?: string;
    image?: SanityImage;
}

export interface SeoData {
    _id: string;
    _type: "seoData";
    companyName: string;
    aboutPageSeo: PageSeoData;
    servicesPageSeo: PageSeoData;
    portfolioPageSeo: PageSeoData;
    blogPageSeo: PageSeoData;
}

export const pageSeoDataFragment = `
    _id,
    _type,
    title,
    description,
    image {
        ${assetFragment}
    },
`;

export const seoDataFragment = `
    _id,
    _type,
    companyName,
    aboutPageSeo {
        ${pageSeoDataFragment}
    },
    servicesPageSeo {
        ${pageSeoDataFragment}
    },
    portfolioPageSeo {
        ${pageSeoDataFragment}
    },
    blogPageSeo {
        ${pageSeoDataFragment}
    },
`;
