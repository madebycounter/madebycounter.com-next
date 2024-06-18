import { Metadata } from "next";

import { SanityImage } from "@/lib/types";

export function makeSeoData(
    title: string,
    description: string,
    image: SanityImage,
): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: `${image.asset.url}?w=600&h=315&q=50&fm=jpg`,
                    width: 600,
                    height: 315,
                },
            ],
        },
        manifest: "/site.webmanifest",
    };
}
