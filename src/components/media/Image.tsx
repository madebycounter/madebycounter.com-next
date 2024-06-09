import { SanityImage } from "@/lib/sanity.types";
import NextImage from "next/image";
import styles from "./Image.module.css";
import clsx from "clsx";
import { getImageDimensions } from "@sanity/asset-utils";

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
    sizes?: string;
    quality?: number;
    sharp?: number;
}

export default function Image({
    src,
    alt,
    onReady,
    sizes,
    className,
    quality = 75,
    sharp = 1,
}: ImageProps) {
    const size = getImageDimensions(src.asset.url);

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
                return `${src}?w=${width}&q=${quality}&sharp=${sharp}`;
            }}
        />
    );
}
