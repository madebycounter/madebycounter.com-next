import { Metadata } from "next";

import { useCompanyInfo, useAboutPage } from "@/lib/query";

import NewsletterPage from "./Newsletter";

export const metadata: Metadata = {
    title: "Counter | Sign up for our monthly newsletter",
    description: "The latest /counter updates, direct to your inbox.",
};

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <NewsletterPage companyInfo={companyInfo} aboutPage={aboutPage} />;
}
