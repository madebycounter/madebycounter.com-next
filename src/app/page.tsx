import { Metadata, ResolvingMetadata } from "next";

import About from "@/components/pages/About";

import { useAboutPage, useCompanyInfo } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "abc",
        manifest: "/site.webmanifest",
    };
}
export default async function Page() {
    const companyInfo = await useCompanyInfo();
    const aboutPage = await useAboutPage();

    return <About companyInfo={companyInfo} aboutPage={aboutPage} />;
}
