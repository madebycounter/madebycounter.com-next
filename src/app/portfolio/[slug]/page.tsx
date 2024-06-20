import { Metadata } from "next";

import blocksToText from "@/util/blocksToText";
import { makeSeoData } from "@/util/seo";

import PortfolioItemPage from "@/components/pages/templates/PortfolioItem";

import { useCompanyInfo, usePortfolioItem, useSeoData } from "@/lib/types";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName } = await useSeoData();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const portfolioItem = await usePortfolioItem(params.slug);

    return makeSeoData(
        `${companyName} | ${portfolioItem.title}`,
        blocksToText(portfolioItem.description),
        portfolioItem.thumbnail,
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const portfolioItem = await usePortfolioItem(params.slug);
    const companyInfo = await useCompanyInfo();

    return (
        <PortfolioItemPage
            companyInfo={companyInfo}
            portfolioItem={portfolioItem}
        />
    );
}
