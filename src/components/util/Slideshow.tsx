"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import Media from "@/components/util/Media";
import MediaSize, { Small } from "@/components/util/MediaSize";

import { MultiMedia, MuxVideo, SanityImage } from "@/lib/types";

import styles from "./Slideshow.module.css";

export function filterMedia(media: MultiMedia[]): MuxVideo[] | SanityImage[] {
    if (media.length === 0) {
        return [];
    }

    if (media[0]._type === "image") {
        return media
            .filter((item) => item._type === "image")
            .map((item) => item as SanityImage);
    }

    return media
        .filter((item) => item._type === "mux.video")
        .map((item) => item as MuxVideo);
}

export interface SlideshowProps {
    items: SanityImage[] | MuxVideo[];
    className?: string;
    imageSpeed?: number;
    offset?: number;
    size?: MediaSize;
    onClick?: (key: string) => void;
}

function notLessThanZero(value: number) {
    return value < 0 ? 0 : value;
}

export default function Slideshow({
    items,
    className,
    imageSpeed = 5000,
    offset = 0,
    size = Small,
    onClick,
}: SlideshowProps) {
    const firstTimeout = useRef(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (items.length !== 0 && items[0]._type === "image") {
            var timeout = setTimeout(
                () => {
                    firstTimeout.current = false;
                    setIndex((index + 1) % items.length);
                },
                firstTimeout.current
                    ? notLessThanZero(imageSpeed - offset)
                    : imageSpeed,
            );

            return () => clearTimeout(timeout);
        }
    }, [index, imageSpeed, offset, items]);

    return (
        <div className={clsx(styles.Slideshow, className)}>
            {items.map((item, i) => (
                <div
                    key={i}
                    className={clsx(styles.SlideshowChild, {
                        [styles.SlideshowChild__active]: i === index,
                    })}
                >
                    <Media
                        src={item}
                        onEnded={() => {
                            setIndex((index + 1) % items.length);
                        }}
                        loop={items.length === 1}
                        playing={i === index}
                        mode="cover"
                        size={size}
                        onClick={onClick}
                    />
                </div>
            ))}
        </div>
    );
}
