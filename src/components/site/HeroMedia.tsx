"use client";

import { useEffect, useState } from "react";

import Slideshow, { filterMedia } from "@/components/util/Slideshow";
import { VideoEmbed } from "@/components/util/VideoEmbed";

import { MultiMedia } from "@/lib/types";

export interface HeroMediaProps {
    video?: string;
    slideshow?: MultiMedia[];
    className?: string;
    onClick?: (key: string) => void;
}

export default function HeroMedia({
    video,
    slideshow,
    className,
    onClick,
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
                    onClick={onClick}
                />,
            );
        }
    }, [video, slideshow, onClick]);

    return <div className={className}>{dynamicData}</div>;
}
