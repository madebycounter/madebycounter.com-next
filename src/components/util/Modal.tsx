import clsx from "clsx";

import styles from "./Modal.module.css";

export interface ModalProps {
    children?: React.ReactNode;
    className?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Modal({
    children,
    open,
    setOpen,
    className,
}: ModalProps) {
    return (
        <div
            className={clsx(
                styles.Modal,
                { [styles.Modal__open]: open },
                className,
            )}
        >
            <div
                className={styles.ModalContent}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setOpen(false);
                }}
            >
                {children}
            </div>
        </div>
    );
}
