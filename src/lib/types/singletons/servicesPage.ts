import { defineType } from "sanity";

import { Service, serviceFragment } from "../service";

export const servicesPageSchema = defineType({
    name: "servicesPage",
    title: "Services Page",
    type: "document",
    fields: [
        {
            type: "array",
            name: "services",
            title: "Services",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "service",
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Services Page",
            };
        },
    },
});

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
