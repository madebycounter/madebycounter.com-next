"use client";

import clsx from "clsx";
import React, { useEffect, useRef } from "react";

import styles from "./Parallax.module.css";

export interface ParallaxProps {
    children?: React.ReactNode;
    driverRef: React.RefObject<HTMLDivElement>;
    className?: string;
}

// Driven element
function Parallax({ children, className, driverRef }: ParallaxProps) {
    const drivenRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (!driverRef.current) return;
            if (!drivenRef.current) return;

            var progress =
                (window.scrollY - driverRef.current.offsetTop) /
                (driverRef.current.offsetHeight - window.innerHeight);

            var offset =
                (drivenRef.current.offsetHeight - window.innerHeight) *
                progress;

            drivenRef.current.style.top = `-${offset}px`;
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [driverRef]);

    return (
        <div className={clsx(className, styles.Parallax)} ref={drivenRef}>
            {children}
        </div>
    );
}

export interface ParallaxDriverProps {
    children?: React.ReactNode;
    className?: string;
    driverRef: React.RefObject<HTMLDivElement>;
}

function Driver({ children, className, driverRef }: ParallaxDriverProps) {
    return (
        <div ref={driverRef} className={className}>
            {children}
        </div>
    );
}

Parallax.Driver = Driver;

export default Parallax;
