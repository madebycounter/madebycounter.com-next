import { query } from "@/lib/sanity";
import { ServicesPage, servicesPageFragment } from "@/lib/types";

export async function useServicesPage(): Promise<ServicesPage> {
    return await query(
        `
        *[_type == "servicesPage"][0] {
            ${servicesPageFragment}
        }
    `,
        {},
        ["servicesPage"],
    );
}
