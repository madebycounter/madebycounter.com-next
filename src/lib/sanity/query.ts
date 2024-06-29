import { draftMode } from "next/headers";

import { client } from "./client";

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
            stega: true,
        }),
        next: {
            ...(preview && {
                revalidate: 1,
            }),
            tags,
        },
    });
}
