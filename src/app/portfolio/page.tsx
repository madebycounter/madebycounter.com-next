import { Metadata } from "next";

import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import PortfolioPage from "@/components/pages/Portfolio";

import {
    useCompanyInfo,
    usePortfolioItems,
    usePortfolioPage,
} from "@/lib/query";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const portfolioPage = await usePortfolioPage();

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, portfolioPage.title),
        portfolioPage.description,
        portfolioPage.image,
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
