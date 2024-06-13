import { useEffect, useState } from "react";

import Slideshow, { filterMedia } from "@/components/util/Slideshow";
import { VideoEmbed } from "@/components/util/VideoEmbed";

import { MultiMedia } from "@/lib/sanity.types";

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
            setDynamicData(<Slideshow items={filterMedia(slideshow)} />);
        }
    }, [video, slideshow]);

    return <div className={className}>{dynamicData}</div>;
}
