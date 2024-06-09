import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import styles from "./Button.module.css";

export interface ButtonProps {
    children: ReactNode;
    href: string;
    className?: string;
    direction?: "left" | "right";
}

export default function Button({
    children,
    href,
    direction = "right",
    className,
}: ButtonProps) {
    return (
        <Link
            className={clsx(
                className,
                "relative block bg-white p-1 font-counter text-5xl font-normal tracking-tighter text-black",
            )}
            href={href}
        >
            <div>{children}</div>

            <div
                className={clsx(
                    "absolute left-full top-0 aspect-[16/46] h-full bg-inherit",
                    {
                        [styles.right]: direction === "right",
                        [styles.left]: direction === "left",
                    },
                )}
            />
        </Link>
    );
}
