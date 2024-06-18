import { client } from "@/lib/sanity";

import { SanityImage, assetFragment } from "../assets";

export interface PageSeoData {
    _id: string;
    _type: "pageSeoData";
    title: string;
    description: string;
    image: SanityImage;
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

export const seoDataFragment = `
    _id,
    _type,
    companyName,
    aboutPageSeo {
        _id,
        _type,
        title,
        description,
        image {
            ${assetFragment}
        },
    },
    servicesPageSeo {
        _id,
        _type,
        title,
        description,
        image {
            ${assetFragment}
        },
    },
    portfolioPageSeo {
        _id,
        _type,
        title,
        description,
        image {
            ${assetFragment}
        },
    },
    blogPageSeo {
        _id,
        _type,
        title,
        description,
        image {
            ${assetFragment}
        },
    },
`;

export async function useSeoData(): Promise<SeoData> {
    return await client.fetch(`
        *[_type == "seoData"][0] {
            ${seoDataFragment}
        }
    `);
}
