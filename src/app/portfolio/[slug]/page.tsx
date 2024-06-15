import PortfolioItemPage from "@/components/pages/templates/PortfolioItem";

import { useCompanyInfo, usePortfolioItem } from "@/lib/types";

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
