import IndexPage from "@/components/pages/AboutPage";
import Button from "@/components/site/Button";

import { useCompanyInfo, usePortfolioItem, useTeamMember } from "@/lib/sanity";

export default async function Home() {
    const portfolioItem = await usePortfolioItem("margaretfest-2023");
    const companyInfo = await useCompanyInfo();
    const henry = await useTeamMember("henry-buck");
    const luke = await useTeamMember("luke-a-makinson");
    const william = await useTeamMember("william-gardner");

    return (
        <IndexPage
            portfolioItem={portfolioItem}
            companyInfo={companyInfo}
            henry={henry}
            luke={luke}
            william={william}
        />
    );
}
