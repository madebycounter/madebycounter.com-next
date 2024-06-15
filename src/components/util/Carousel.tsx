"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useContainerSize } from "@/util/hooks";

import styles from "./Carousel.module.css";

export type CarouselDirection = "up" | "down" | "left" | "right";

export interface CarouselProps {
    child: React.ReactNode;
    childSize: number;
    speed?: number;
    direction?: CarouselDirection;
    className?: string;
}

function isHorizontal(direction: CarouselDirection) {
    return direction === "left" || direction === "right";
}

export default function Carousel({
    child,
    childSize,
    speed = 100,
    direction = "left",
    className,
}: CarouselProps) {
    const ref = useRef<HTMLDivElement>(null);
    const size = useContainerSize(ref);
    const [quantity, setQuantity] = useState(0);
    const [directions, setDirections] = useState({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    });

    const updateQuantity = () => {
        if (!ref.current) return;
        const parentSize = isHorizontal(direction)
            ? ref.current.offsetWidth
            : ref.current.offsetHeight;
        setQuantity(Math.ceil(parentSize / childSize) + 1);
    };

    useEffect(updateQuantity, [size, childSize, direction]);

    useEffect(() => {
        switch (direction) {
            case "up":
                setDirections({
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: -childSize,
                });
                break;
            case "down":
                setDirections({
                    x1: 0,
                    y1: -childSize,
                    x2: 0,
                    y2: 0,
                });
                break;
            case "left":
                setDirections({
                    x1: 0,
                    y1: 0,
                    x2: -childSize,
                    y2: 0,
                });
                break;
            case "right":
                setDirections({
                    x1: -childSize,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                });
        }
    }, [direction, childSize]);

    return (
        <div
            className={clsx(styles.Carousel, className)}
            ref={ref}
            style={
                {
                    "--speed": `${childSize / speed}s`,
                    "--x1": `${directions.x1}px`,
                    "--y1": `${directions.y1}px`,
                    "--x2": `${directions.x2}px`,
                    "--y2": `${directions.y2}px`,
                } as React.CSSProperties
            }
        >
            <div
                className={clsx(styles.Slider, {
                    [styles.Slider__horizontal]: isHorizontal(direction),
                    [styles.Slider__vertical]: !isHorizontal(direction),
                })}
                onLoad={updateQuantity}
            >
                {[...Array(quantity)].map((_, i) => (
                    <div key={i}>{child}</div>
                ))}
            </div>
        </div>
    );
}
