import { useCompanyInfo, useAboutPage } from "@/lib/query";

import NotifyPage from "./Notify";

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <NotifyPage companyInfo={companyInfo} aboutPage={aboutPage} />;
}
