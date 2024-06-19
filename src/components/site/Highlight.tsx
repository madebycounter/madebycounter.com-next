"use client";

import clsx from "clsx";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

import { useScrollPosition } from "@/util/hooks";

import styles from "./Highlight.module.css";

export interface HighlightProps {
    children?: React.ReactNode;
    className?: string;
    classNameVisible?: string;
    classNameHidden?: string;
    offset?: number;
}

export default function Highlight({
    children,
    className,
    offset = 0,
}: HighlightProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    const checkVisibility = debounce(() => {
        if (!ref.current) return;

        var windowHeight = window.innerHeight;
        var elementTop = ref.current.getBoundingClientRect().top;

        if (elementTop < windowHeight - offset) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, 25);

    useEffect(() => {
        window.addEventListener("load", checkVisibility);
        window.addEventListener("resize", checkVisibility);
        window.addEventListener("scroll", checkVisibility, {
            passive: true,
        });

        checkVisibility();

        return () => {
            window.removeEventListener("load", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
            window.removeEventListener("scroll", checkVisibility);
        };
    });

    return (
        <span
            ref={ref}
            className={clsx(className, styles.Highlight, {
                [styles.Highlight__visible]: visible,
            })}
        >
            {children}
        </span>
    );
}
