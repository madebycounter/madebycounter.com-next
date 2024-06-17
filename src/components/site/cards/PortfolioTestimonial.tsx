"use client";

import { PortableText } from "@portabletext/react";
import clsx from "clsx";
import { useRef } from "react";

import { useContainerSize } from "@/util/hooks";

import Media from "@/components/util/Media";
import Rating from "@/components/util/Rating";

import { Testimonial } from "@/lib/types";

export interface PortfolioTestimonialProps {
    src: Testimonial;
    className?: string;
}

export default function PortfolioTestimonial({
    src,
    className,
}: PortfolioTestimonialProps) {
    const ref = useRef<HTMLDivElement>(null);
    const size = useContainerSize(ref);

    return (
        <div className={clsx("flex flex-nowrap items-start gap-4", className)}>
            <p
                className="m-0 shrink-0 basis-[300px] text-[1.6rem] font-light leading-[1.2em]"
                ref={ref}
            >
                <span className="font-counter tracking-tighter">
                    /review&nbsp;
                </span>
                &ldquo;
                <PortableText
                    value={src.quote}
                    components={{
                        block: {
                            normal: ({ children }) => <>{children}</>,
                        },
                    }}
                />
                &rdquo;
            </p>

            <div
                className="flex shrink grow flex-col gap-1"
                style={{
                    height: size.height,
                }}
            >
                <Media src={src.photoBackground} mode="cover" />

                <div className="">
                    <Rating className="h-[25px]">
                        <Rating.Star className="bg-black" />
                        <Rating.Star className="bg-black" />
                        <Rating.Star className="bg-black" />
                        <Rating.Star className="bg-black" />
                        <Rating.Star className="bg-black" />
                    </Rating>

                    <p className="text-[1rem] font-bold leading-[1.2em]">
                        {src.name}
                    </p>

                    <>
                        {src.jobTitle.map((title, idx) => (
                            <p
                                key={idx}
                                className="text-[1rem] font-light leading-[1.2em]"
                            >
                                {title}
                            </p>
                        ))}
                    </>
                </div>
            </div>
        </div>
    );
}
