import About from "@/components/pages/About";
import PortfolioPage from "@/components/pages/Portfolio";

import { useCompanyInfo, usePortfolioItems } from "@/lib/sanity";

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
