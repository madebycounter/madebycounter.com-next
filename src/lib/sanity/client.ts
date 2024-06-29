import { createClient } from "next-sanity";

export const client = createClient({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    perspective: "published",
    stega: {
        enabled: false,
        studioUrl: "/studio",
    },
});
