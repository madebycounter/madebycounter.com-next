import { Metadata } from "next";

import blocksToText from "@/util/blocksToText";
import formatTitle from "@/util/formatTitle";
import { makeSeoData } from "@/util/seo";

import ServicePage from "@/components/pages/templates/ServicePage";

import { useCompanyInfo, useService } from "@/lib/query";

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const companyInfo = await useCompanyInfo();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const service = await useService(params.slug);

    return makeSeoData(
        formatTitle(companyInfo.titleFormat, service.title),
        service.seoData.description,
        service.seoData.image,
    );
}

export default async function Page({ params }: { params: { slug: string } }) {
    const companyInfo = await useCompanyInfo();
    const service = await useService(params.slug);

    return <ServicePage companyInfo={companyInfo} service={service} />;
}
