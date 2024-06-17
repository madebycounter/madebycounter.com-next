"use client";

import clsx from "clsx";
import { PortableText } from "next-sanity";

import Button from "@/components/site/Button";
import Media, { MediaSizes } from "@/components/util/Media";

import { MiniService } from "@/lib/types";

export interface MiniServiceCardProps {
    src: MiniService;
    className?: string;
    onClick?: (src: MiniService) => void;
}

export default function MiniServiceCard({
    src,
    className,
    onClick,
}: MiniServiceCardProps) {
    return (
        <div className={clsx(className)}>
            <div className="aspect-4/3">
                <Media src={src.photo} size={MediaSizes.Small} />
            </div>

            <h2 className="py-2 font-counter text-3xl leading-[0.8em] tracking-tighter">
                {src.title}
            </h2>

            <div className="pb-2">
                <PortableText
                    value={src.description}
                    components={{
                        block: {
                            normal: ({ children }) => (
                                <p className="text-xl font-light leading-[1.2em]">
                                    {children}
                                </p>
                            ),
                        },
                    }}
                />
            </div>

            <Button
                onClick={() => {
                    if (onClick) onClick(src);
                }}
                className="text-2xl"
                classNameInner="!py-0 grow text-right"
                inverted
            >
                {src.buttonText}
            </Button>
        </div>
    );
}
