import ServicesPage from "@/components/pages/Services";

import { useCompanyInfo, useServices } from "@/lib/sanity";
import { Service } from "@/lib/types";

export default async function Page() {
    const services = await useServices();
    const companyInfo = await useCompanyInfo();

    return <ServicesPage services={services} companyInfo={companyInfo} />;
}
