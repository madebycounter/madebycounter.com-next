import { Metadata } from "next";

import blocksToText from "@/util/blocksToText";
import { makeSeoData } from "@/util/seo";

import ServicePage from "@/components/pages/templates/ServicePage";

import { useCompanyInfo, useSeoData, useService } from "@/lib/query";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { companyName } = await useSeoData();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const service = await useService(params.slug);

    return makeSeoData(
        `${companyName} | ${service.title}`,
        blocksToText(service.heroText),
        service.slideshow[0],
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const companyInfo = await useCompanyInfo();
    const service = await useService(params.slug);

    return <ServicePage companyInfo={companyInfo} service={service} />;
}
