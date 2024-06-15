import clsx from "clsx";

import styles from "./Slash.module.css";

export interface SlashProps {
    direction: "left" | "right";
    className?: string;
}

export default function Slash({ direction, className }: SlashProps) {
    return (
        <div
            className={clsx(className, styles.Slash, {
                [styles.Slash__left]: direction === "left",
                [styles.Slash__right]: direction === "right",
            })}
        />
    );
}
