import { query } from "@/lib/sanity";
import { CompanyInfo, companyInfoFragment } from "@/lib/types";

export async function useCompanyInfo(): Promise<CompanyInfo> {
    return await query(
        `*[_type == "companyInfo"][0] {
        ${companyInfoFragment}
    }`,
        {},
        ["companyInfo", "service", "portfolioItem"],
    );
}
