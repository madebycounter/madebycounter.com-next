import { client } from "@/lib/sanity";

import { Service, serviceFragment } from "../service";

export interface ServicesPage {
    _id: string;
    _type: "servicesPage";
    services: Service[];
}

export const servicesPageFragment = `
    _id,
    _type,
    services[]->{
        ${serviceFragment}
    },
`;

export async function useServicesPage(): Promise<ServicesPage> {
    return await client.fetch(`
        *[_type == "servicesPage"][0] {
            ${servicesPageFragment}
        }
    `);
}
