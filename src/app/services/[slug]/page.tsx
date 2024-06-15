import ServicePage from "@/components/pages/templates/ServicePage";

import { useCompanyInfo, useService } from "@/lib/types";

export default async function Page({ params }: { params: { slug: string } }) {
    const companyInfo = await useCompanyInfo();
    const service = await useService(params.slug);

    return <ServicePage companyInfo={companyInfo} service={service} />;
}
