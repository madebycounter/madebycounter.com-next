import clsx from "clsx";

import styles from "./Spinner.module.css";

export interface SpinnerProps {
    className?: string;
}

export default function Spinner({ className }: SpinnerProps) {
    return <span className={clsx(styles.Spinner, className)} />;
}
