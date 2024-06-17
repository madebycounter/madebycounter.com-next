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
    const Action = href ? "a" : onClick ? "button" : "div";

    return (
        <Action href={href} onClick={onClick} className={className}>
            {children}
        </Action>
    );
}
