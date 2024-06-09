"use client";

import { MuxVideo, SanityImage } from "@/lib/sanity.types";
import clsx from "clsx";
import styles from "./Media.module.css";
import { getImageDimensions } from "@sanity/asset-utils";
import Video, { VideoPreview } from "./Video";
import Image, { ImagePreview } from "./Image";
import { useState } from "react";

export type MediaAsset = MuxVideo | SanityImage;

export function getAspectRatio(src: MediaAsset) {
    if (src._type === "mux.video") {
        return (
            src.asset.data.tracks[0].max_width /
            src.asset.data.tracks[0].max_height
        );
    }

    return getImageDimensions(src).aspectRatio;
}

export interface MediaProps {
    src: MediaAsset;
    alt?: string;
    mode: "height" | "width" | "cover" | "contain";
    onReady?: () => void;
    onClick?: (key: string) => void;
    className?: string;
    sizes?: string;
    quality?: number;
    sharp?: number;
}

export default function Media({
    src,
    alt = "",
    mode,
    onReady,
    onClick,
    className,
    sizes,
    quality,
    sharp,
}: MediaProps) {
    const [isReady, setIsReady] = useState(false);

    function handleReady() {
        setIsReady(true);
        if (onReady) onReady();
    }

    return (
        <div
            className={clsx(className, styles.Media, {
                [styles.Media__width]: mode === "width",
                [styles.Media__height]: mode === "height",
                [styles.Media__cover]: mode === "cover",
                [styles.Media__contain]: mode === "contain",
                [styles.clickable]: onClick,
            })}
            style={
                {
                    "--aspect-ratio": `${getAspectRatio(src)}`,
                } as React.CSSProperties
            }
            onClick={() => {
                if (onClick) onClick(src._key);
            }}
        >
            {src._type === "mux.video" && (
                <>
                    <Video src={src} onReady={handleReady} />

                    <VideoPreview
                        src={src}
                        className={clsx(
                            styles.Preview,
                            isReady && styles.Preview__hidden
                        )}
                    />
                </>
            )}

            {src._type === "image" && (
                <>
                    <Image
                        src={src}
                        alt={alt}
                        onReady={handleReady}
                        sizes={sizes}
                        quality={quality}
                        sharp={sharp}
                    />

                    <ImagePreview
                        src={src}
                        className={clsx(
                            styles.Preview,
                            isReady && styles.Preview__hidden
                        )}
                    />
                </>
            )}
        </div>
    );
}
