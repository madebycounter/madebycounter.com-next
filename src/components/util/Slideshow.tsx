"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { MuxVideo, SanityImage } from "@/lib/sanity.types";

import Media from "../media/Media";
import styles from "./Slideshow.module.css";

export interface SlideshowProps {
    items: SanityImage[] | MuxVideo[];
    className?: string;
    imageSpeed?: number;
    offset?: number;
}

function notLessThanZero(value: number) {
    return value < 0 ? 0 : value;
}

export default function Slideshow({
    items,
    className,
    imageSpeed = 5000,
    offset = 0,
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
                        videoOptions={{
                            onEnded: () => {
                                setIndex((index + 1) % items.length);
                            },
                            loop: false,
                            playing: i === index,
                        }}
                        mode="cover"
                    />
                </div>
            ))}
        </div>
    );
}
