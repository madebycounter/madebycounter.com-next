"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useRef } from "react";

import { useContainerSize } from "@/util/hooks";

import styles from "./Button.module.css";

export interface ButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    classNameInner?: string;
    direction?: "left" | "right";
    inverted?: boolean;
    onClick?: () => void;
}

export default function Button({
    children,
    href = "",
    direction = "right",
    inverted = false,
    className,
    classNameInner,
    onClick,
}: ButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const size = useContainerSize(ref);

    return (
        <Link
            className={clsx(
                "block font-counter text-5xl font-normal tracking-tight",
            )}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick();
            }}
        >
            <div
                className={clsx(className, "flex flex-nowrap", {
                    "flex-row-reverse": direction === "left",
                })}
            >
                <div
                    ref={ref}
                    className={clsx("relative p-1", classNameInner, {
                        "bg-white text-black": !inverted,
                        "bg-black text-white": inverted,
                    })}
                >
                    {children}
                </div>

                <div
                    className={clsx("aspect-[16/46]", {
                        "bg-white text-black": !inverted,
                        "bg-black text-white": inverted,
                        [styles.right]: direction === "right",
                        [styles.left]: direction === "left",
                    })}
                    style={{
                        height: size.height,
                    }}
                />
            </div>
        </Link>
    );
}
