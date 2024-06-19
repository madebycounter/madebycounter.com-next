import { StringNullableChain } from "lodash";
import Link from "next/link";
import { ReactNode } from "react";

export interface ActionProps {
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    target?: string;
    label?: string;
}

export default function Action({
    href,
    onClick,
    className,
    children,
    target,
    label,
}: ActionProps) {
    const Action = href ? Link : onClick ? "button" : "div";

    return (
        <Action
            href={href as string}
            target={target}
            onClick={onClick}
            className={className}
            aria-label={label}
        >
            {children}
        </Action>
    );
}
