import clsx from "clsx";

import styles from "./Arrow.module.css";

export interface ArrowProps {
    direction: "left" | "right";
    className?: string;
}

export default function Arrow({ direction, className }: ArrowProps) {
    return (
        <div
            className={clsx(styles.Arrow, className, {
                [styles.Arrow__left]: direction === "left",
                [styles.Arrow__right]: direction === "right",
            })}
        />
    );
}
