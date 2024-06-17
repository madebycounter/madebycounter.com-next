"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { MediaSizes } from "@/components/util/Media";
import Slideshow, { filterMedia } from "@/components/util/Slideshow";
import { VideoEmbed } from "@/components/util/VideoEmbed";

import { MultiMedia } from "@/lib/types";

export interface HeroMediaProps {
    video?: string;
    slideshow?: MultiMedia[];
    className?: string;
}

export default function HeroMedia({
    video,
    slideshow,
    className,
}: HeroMediaProps) {
    const [dynamicData, setDynamicData] = useState(<></>);

    useEffect(() => {
        if (video) {
            setDynamicData(<VideoEmbed url={video} />);
        } else if (slideshow) {
            setDynamicData(
                <Slideshow
                    items={filterMedia(slideshow)}
                    size={{
                        img: 1920,
                        video: "high",
                    }}
                />,
            );
        }
    }, [video, slideshow]);

    return <div className={className}>{dynamicData}</div>;
}
