import { Metadata } from "next";
import { notFound } from "next/navigation";

import blocksToText from "@/util/blocksToText";
import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import PortfolioItemPage from "@/components/pages/templates/PortfolioItem";

import { usePortfolioItem, useCompanyInfo } from "@/lib/query";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const portfolioItem = await usePortfolioItem(params.slug);

    if (!portfolioItem) return {};

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, portfolioItem.title),
        blocksToText(portfolioItem.description),
        portfolioItem.thumbnail,
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const portfolioItem = await usePortfolioItem(params.slug);
    const companyInfo = await useCompanyInfo();

    if (!portfolioItem) return notFound();

    return (
        <PortfolioItemPage
            companyInfo={companyInfo}
            portfolioItem={portfolioItem}
        />
    );
}
