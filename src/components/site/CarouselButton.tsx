"use client";

import clsx from "clsx";
import { useState } from "react";

import Button, { ButtonProps } from "@/components/site/Button";
import Carousel from "@/components/util/Carousel";
import Media from "@/components/util/Media";
import { Small } from "@/components/util/MediaSize";

import { MultiMedia } from "@/lib/types";

export interface CarouselButtonProps extends ButtonProps {
    media: MultiMedia[];
    direction?: "left" | "right";
}

export default function CarouselButton({
    children,
    media,
    direction = "right",
    ...props
}: CarouselButtonProps) {
    const [width, setWidth] = useState(1);

    return (
        <Button
            {...props}
            direction={direction}
            onSizeChange={({ height }) => {
                setWidth((height + 4) * media.length);
            }}
        >
            {children}
            <Carousel
                className="absolute left-0 top-0 -z-10 h-full w-full"
                classNameInner="h-full"
                child={
                    <div className="mr-1 flex h-full gap-1">
                        {media.map((m, i) => (
                            <div key={i} className="aspect-square h-full">
                                <Media src={m} size={Small} />
                            </div>
                        ))}
                    </div>
                }
                childSize={width}
                speed={30}
                direction={direction}
            />
        </Button>
    );
}
