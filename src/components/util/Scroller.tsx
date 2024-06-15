"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

import { useContainerSize, useWindowSize } from "@/util/hooks";

import styles from "./Scroller.module.css";

export interface ScrollerProps {
    children?: React.ReactNode;
    className?: string;
}

export default function Scroller({ children, className }: ScrollerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const size = useContainerSize(ref, 500);

    useEffect(() => {
        if (!ref.current) return;

        const container = ref.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        // Calculate the scrollLeft value to center the content
        const scrollLeft = (scrollWidth - clientWidth) / 2;

        // Set the scrollLeft value to center the content
        container.scrollLeft = scrollLeft;
    }, [size]);

    return (
        <div className={clsx(className, styles.Scroller)} ref={ref}>
            {children}
        </div>
    );
}
