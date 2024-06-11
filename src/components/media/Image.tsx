import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import NextImage from "next/image";

import { SanityImage } from "@/lib/sanity.types";

import styles from "./Image.module.css";

export interface ImagePreviewProps {
    src: SanityImage;
    className?: string;
}

export function ImagePreview({ src, className }: ImagePreviewProps) {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src.asset.metadata.lqip} className={className} alt="" />
        </>
    );
}

export interface ImageProps {
    src: SanityImage;
    alt: string;
    onReady?: () => void;
    className?: string;
    priority?: boolean;
    imageOptions?: ImageOptions;
}

export type ImageOptions = {
    sizes?: string;
    quality?: number;
    sharp?: number;
};

export default function Image({
    src,
    alt,
    onReady,
    imageOptions = {},
    className,
    priority = false,
}: ImageProps) {
    const size = getImageDimensions(src.asset.url);
    const { sizes = "100vw", quality = 75, sharp = 20 } = imageOptions;

    return (
        <NextImage
            src={src.asset.url}
            alt={alt}
            className={clsx(className, styles.Image)}
            onLoad={onReady}
            width={size.width}
            height={size.height}
            sizes={sizes}
            loader={({ src, width }) => {
                return `${src}?w=${width}&q=${quality}&sharp=${sharp}&fm=webp`;
            }}
            priority={priority}
        />
    );
}
