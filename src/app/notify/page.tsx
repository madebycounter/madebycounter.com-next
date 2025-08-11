import { Metadata } from "next";

import { useCompanyInfo, useAboutPage } from "@/lib/query";

import NotifyPage from "./Notify";

export const metadata: Metadata = {
    title: "Counter | Subscribe to SMS notifications",
    description: "Get notified when your favorite bands go live!",
};

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <NotifyPage companyInfo={companyInfo} aboutPage={aboutPage} />;
}
