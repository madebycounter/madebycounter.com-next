import { Metadata } from "next";

import { makeSeoData } from "@/util/seo";

import About from "@/components/pages/About";

import { useAboutPage, useCompanyInfo } from "@/lib/types";
import { useSeoData } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName, aboutPageSeo } = await useSeoData();

    return makeSeoData(
        `${companyName} | ${aboutPageSeo.title}`,
        aboutPageSeo.description,
        aboutPageSeo.image,
    );
}

export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <About companyInfo={companyInfo} aboutPage={aboutPage} />;
}
