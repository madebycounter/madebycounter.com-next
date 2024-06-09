"use client";

import { useState } from "react";

import { MuxVideo, SanityImage } from "@/lib/sanity.types";

export interface SlideshowProps {
    items: SanityImage[] | MuxVideo[];
    className?: string;
    autoplaySpeed?: number;
    autoplayOffset?: number;
    autoplay?: boolean;
}

export default function Slideshow({
    items,
    className,
    autoplaySpeed = 5000,
    autoplayOffset = 0,
    autoplay = true,
}: SlideshowProps) {
    const [index, setIndex] = useState(0);
}
