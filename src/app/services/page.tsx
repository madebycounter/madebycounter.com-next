import { Metadata } from "next";

import { makeSeoData } from "@/util/seo";

import ServicesPage from "@/components/pages/Services";

import { useCompanyInfo, useServices } from "@/lib/types";
import { useSeoData } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName, servicesPageSeo } = await useSeoData();

    return makeSeoData(
        `${companyName} | ${servicesPageSeo.title}`,
        servicesPageSeo.description,
        servicesPageSeo.image,
    );
}

export default async function Page() {
    const services = await useServices();
    const companyInfo = await useCompanyInfo();

    return <ServicesPage services={services} companyInfo={companyInfo} />;
}
