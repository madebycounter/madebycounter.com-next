"use client";

import clsx from "clsx";

import { useScrollPosition } from "@/util/hooks";

import Nav, { NavVariableProps } from "./Nav";

export default function VariableNav({
    children,
    className,
    classNameTop = "",
    classNameScrolled = "",
    threshold = 300,
}: NavVariableProps) {
    const scrollPosition = useScrollPosition(25);

    return (
        <Nav
            className={clsx(className, {
                [classNameTop]: scrollPosition <= threshold,
                [classNameScrolled]: scrollPosition > threshold,
            })}
        >
            {children}
        </Nav>
    );
}
