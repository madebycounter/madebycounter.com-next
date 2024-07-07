import { Metadata } from "next";

import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import About from "@/components/pages/About";

import { useCompanyInfo, useAboutPage } from "@/lib/query";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const aboutPage = await useAboutPage();

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, aboutPage.title),
        aboutPage.description,
        aboutPage.image,
    );
}

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <About companyInfo={companyInfo} aboutPage={aboutPage} />;
}
