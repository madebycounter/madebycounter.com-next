import Button from "@/components/site/Button2";

import {
    useAboutPage,
    useCompanyInfo,
    usePortfolioItem,
    useTeamMember,
} from "@/lib/types";

import Test from "@/app/test";

export default async function Page() {
    const portfolioItem = await usePortfolioItem("margaretfest-2023");
    const companyInfo = await useCompanyInfo();
    const henry = await useTeamMember("henry-buck");
    const luke = await useTeamMember("luke-a-makinson");
    const william = await useTeamMember("william-gardner");
    const aboutPage = await useAboutPage();

    return (
        <Test aboutPage={aboutPage} />

        // <About
        //     portfolioItem={portfolioItem}
        //     companyInfo={companyInfo}
        //     aboutPage={aboutPage}
        //     henry={henry}
        //     luke={luke}
        //     william={william}
        // />
    );
}
