import ServicesPage from "@/components/pages/Services";

import { useCompanyInfo, useServices } from "@/lib/types";

export default async function Page() {
    const services = await useServices();
    const companyInfo = await useCompanyInfo();

    console.log(services[0].content);

    return <ServicesPage services={services} companyInfo={companyInfo} />;
}
