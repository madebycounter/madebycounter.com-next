import { client } from "@/lib/sanity";

import { SanityImage, assetFragment } from "../assets";

export interface CompanyInfo {
    _id: string;
    _type: "companyInfo";
    name: string;
    logo: SanityImage;
}

export const companyInfoFragment = `
    _id,
    _type,
    name,
    logo {
        ${assetFragment}
    }
`;

export async function useCompanyInfo(): Promise<CompanyInfo> {
    return await client.fetch(`*[_type == "companyInfo"][0] {
        ${companyInfoFragment}
    }`);
}
