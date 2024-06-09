import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import styles from "./Button.module.css";

export interface ButtonProps {
    children: ReactNode;
    href: string;
    className?: string;
    direction?: "left" | "right";
    inverted?: boolean;
}

export default function Button({
    children,
    href,
    direction = "right",
    inverted = false,
    className,
}: ButtonProps) {
    return (
        <Link
            className={clsx(
                className,
                "flex font-counter text-5xl font-normal tracking-tighter",
                {
                    "flex-row-reverse": direction === "left",
                },
            )}
            href={href}
        >
            <div
                className={clsx("relative p-1", {
                    "bg-white text-black": !inverted,
                    "bg-black text-white": inverted,
                })}
            >
                {children}

                <div
                    className={clsx(
                        "absolute top-0 aspect-[16/46] h-full bg-inherit",
                        {
                            [styles.right]: direction === "right",
                            [styles.left]: direction === "left",
                        },
                    )}
                />
            </div>

            <div></div>
        </Link>
    );
}
