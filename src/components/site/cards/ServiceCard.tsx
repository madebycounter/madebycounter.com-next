import clsx from "clsx";

import Button from "@/components/site/Button2";
import Slash from "@/components/site/Slash";
import Action from "@/components/util/Action";
import Media from "@/components/util/Media";
import Slideshow, { filterMedia } from "@/components/util/Slideshow";

import { Service } from "@/lib/types";

export interface ServiceCardProps {
    src: Service;
    className?: string;
}

export default function ServiceCard({ src, className }: ServiceCardProps) {
    var realTitle = src.title;

    if (src.title === "Videography") {
        realTitle = "Video Services";
    }

    if (src.title === "Photography") {
        realTitle = "Photo Services";
    }

    return (
        <Action
            href={`/services/${src.slug.current}`}
            className={clsx(className, "flex")}
        >
            <div className="relative flex basis-[210px] flex-col justify-between">
                <p className="font-counter text-5xl leading-[0.8em] tracking-tighter">
                    {realTitle}
                </p>

                <Button>
                    <Button.Label className="bg-black pb-1 text-3xl text-white">
                        Learn More
                    </Button.Label>
                    <Button.Arrow className="bg-black" />
                </Button>

                <Slash
                    direction="left"
                    className="absolute left-full top-0 z-10 h-full bg-white"
                />
            </div>

            <div className="aspect-video grow">
                <Slideshow items={filterMedia(src.slideshow)} />
            </div>
        </Action>
    );
}
