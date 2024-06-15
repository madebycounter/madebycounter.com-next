import { createClient } from "next-sanity";

export const client = createClient({
    apiVersion: "2024-06-03",
    projectId: "ff27s74x",
    dataset: "production",
    useCdn: false,
});
