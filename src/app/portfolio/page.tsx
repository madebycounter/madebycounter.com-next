import { Metadata } from "next";

import { makeSeoData } from "@/util/seo";

import PortfolioPage from "@/components/pages/Portfolio";

import { useCompanyInfo, usePortfolioItems, useSeoData } from "@/lib/query";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName, portfolioPageSeo } = await useSeoData();

    return makeSeoData(
        `${companyName} | ${portfolioPageSeo.title}`,
        portfolioPageSeo.description,
        portfolioPageSeo.image,
    );
}

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const portfolioItems = await usePortfolioItems();

    return (
        <PortfolioPage
            companyInfo={companyInfo}
            portfolioItems={portfolioItems}
        />
    );
}
