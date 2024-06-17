import About from "@/components/pages/About";

import { useAboutPage, useCompanyInfo } from "@/lib/types";

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <About companyInfo={companyInfo} aboutPage={aboutPage} />;
}
