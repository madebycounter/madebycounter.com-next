"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./Button.module.css";

export interface ButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    classNameInner?: string;
    direction?: "left" | "right";
    inverted?: boolean;
    onClick?: () => void;
    onSizeChange?: (size: { width: number; height: number }) => void;
}

export default function Button({
    children,
    href = "",
    direction = "right",
    inverted = false,
    className,
    classNameInner,
    onClick,
    onSizeChange,
}: ButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function update() {
            if (!ref.current) return;
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });

            if (onSizeChange) {
                onSizeChange({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight,
                });
            }
        }

        window.addEventListener("resize", update);
        update();

        return () => {
            window.removeEventListener("resize", update);
        };
    }, [className, classNameInner, onSizeChange, ref]);

    return (
        <Link
            className={clsx(
                "relative block font-counter text-5xl font-normal tracking-tight",
            )}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick();
            }}
        >
            <div
                className={clsx(className, "flex flex-nowrap items-start", {
                    "flex-row-reverse": direction === "left",
                })}
            >
                <div
                    ref={ref}
                    className={clsx("text-nowrap p-1", classNameInner, {
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
