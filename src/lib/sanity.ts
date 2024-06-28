import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

export const client = createClient({
    apiVersion: process.env.SANITY_API_VERSION,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false,
    perspective: "published",
});

export async function query<T>(
    query: string,
    params?: any,
    tags?: string[],
): Promise<T> {
    const preview = draftMode().isEnabled;

    return client.fetch(query, params || {}, {
        token: process.env.SANITY_READ_TOKEN,
        ...(preview && {
            perspective: "previewDrafts",
            stega: {
                enabled: true,
                studioUrl: "https://madebycounter.sanity.studio",
            },
        }),
        next: {
            ...(preview && {
                revalidate: 0,
            }),
            tags,
        },
    });
}
