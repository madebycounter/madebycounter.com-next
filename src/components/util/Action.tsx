import Link from "next/link";
import { ReactNode } from "react";

export interface ActionProps {
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
}

export default function Action({
    href,
    onClick,
    className,
    children,
}: ActionProps) {
    const Action = href ? Link : onClick ? "button" : "div";

    return (
        <Action href={href as string} onClick={onClick} className={className}>
            {children}
        </Action>
    );
}
