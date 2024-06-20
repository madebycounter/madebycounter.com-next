import { Metadata } from "next";

import { MultiMedia } from "@/lib/types";

export function makeSeoData(
    title: string,
    description: string,
    image: MultiMedia,
    videoEmbed?: string,
): Metadata {
    var youtubeId = null;

    if (videoEmbed) {
        const id = /[/=]([\w_-]{11})\b/.exec(videoEmbed);
        if (id) {
            youtubeId = id[1];
        }
    }

    return {
        title,
        description,
        openGraph: {
            title,
            description,
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
            videos: youtubeId
                ? `https://www.youtube.com/v/${youtubeId}`
                : undefined,
        },
    };
}
