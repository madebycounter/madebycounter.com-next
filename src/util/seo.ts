import { Metadata } from "next";

import { MultiMedia } from "@/lib/types";

export function makeSeoData(
    title?: string,
    description?: string,
    image?: MultiMedia,
): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            ...(image && {
                images: [
                    {
                        url:
                            image._type === "image"
                                ? `${image.asset.url}?w=600&h=315&q=50&fm=jpg`
                                : `https://image.mux.com/${image.asset.playbackId}/thumbnail.jpg?width=600&height=315`,
                        width: 600,
                        height: 315,
                    },
                ],
            }),
        },
    };
}
