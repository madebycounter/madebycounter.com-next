import { useCompanyInfo, useAboutPage } from "@/lib/query";

import NewsletterPage from "./Newsletter";

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <NewsletterPage companyInfo={companyInfo} aboutPage={aboutPage} />;
}
