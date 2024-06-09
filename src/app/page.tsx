import About from "@/components/pages/About";

import {
    useAboutPage,
    useCompanyInfo,
    usePortfolioItem,
    useTeamMember,
} from "@/lib/sanity";

export default async function Home() {
    const portfolioItem = await usePortfolioItem("margaretfest-2023");
    const companyInfo = await useCompanyInfo();
    const henry = await useTeamMember("henry-buck");
    const luke = await useTeamMember("luke-a-makinson");
    const william = await useTeamMember("william-gardner");
    const aboutPage = await useAboutPage();

    return (
        <About
            portfolioItem={portfolioItem}
            companyInfo={companyInfo}
            aboutPage={aboutPage}
            henry={henry}
            luke={luke}
            william={william}
        />
    );
}
