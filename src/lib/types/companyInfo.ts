import { SanityImage, assetFragment } from "@/lib/types/assets";

export const companyInfoFragment = `
    _id,
    _type,
    name,
    logo {
        ${assetFragment}
    }
`;

export interface CompanyInfo {
    _id: string;
    _type: "companyInfo";
    name: string;
    logo: SanityImage;
}
