import clsx from "clsx";
import React, { RefObject } from "react";

import seededShuffle from "@/util/seededShuffle";

import Carousel from "@/components/util/Carousel";
import Media from "@/components/util/Media";

import styles from "./Gallery.module.css";

type GalleryItem = {
    component: React.ReactNode;
    aspectRatio: number;
};

type GalleryLayout = {
    items: GalleryItem[];
    size: number;
}[];

function createLayout(
    items: GalleryItem[],
    groups: number,
    getSize: (item: GalleryItem) => number,
) {
    // Sort images by size
    items.sort((a, b) => getSize(b) - getSize(a));

    // Create layout
    var layout: GalleryLayout = [];
    for (let i = 0; i < groups; i++) layout.push({ items: [], size: 0 });

    // Add images to shortest column until all images are added
    for (let i = 0; i < items.length; i++) {
        var img = items[i];
        var shortestColumn = layout.reduce((prev, curr) =>
            prev.size < curr.size ? prev : curr,
        );

        shortestColumn.items.push(img);
        shortestColumn.size += getSize(img);
    }

    // Shuffle images deterministically
    for (let i = 0; i < groups; i++) {
        layout[i].items = seededShuffle(layout[i].items, 1);
    }

    return layout.map((group) => group.items);
}

function createVerticalLayout(items: GalleryItem[], columns: number) {
    return createLayout(items, columns, (item) => 1 / item.aspectRatio);
}

function createHorizontalLayout(items: GalleryItem[], rows: number) {
    return createLayout(items, rows, (item) => item.aspectRatio);
}

export interface GalleryProps {
    items: GalleryItem[][];
    childRef?: RefObject<HTMLDivElement>;
    className?: string;
    groupClassName?: string;
}

function Gallery({
    items = [],
    className,
    groupClassName,
    childRef,
}: GalleryProps) {
    return (
        <div className={className}>
            {items.map((group, i) => (
                <div key={i} className={clsx(styles.group, groupClassName)}>
                    {group.map((item, j) => (
                        <div
                            key={j}
                            className={clsx(styles.item)}
                            ref={childRef}
                            style={
                                {
                                    "--aspect-ratio": item.aspectRatio,
                                } as React.CSSProperties
                            }
                        >
                            {item.component}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export interface VerticalGalleryProps {
    items: GalleryItem[];
    columns: number;
    className?: string;
    childRef?: RefObject<HTMLDivElement>;
}

function Vertical({
    items,
    columns,
    className,
    childRef,
}: VerticalGalleryProps) {
    const groups = createVerticalLayout(items, columns);

    return (
        <Gallery
            items={groups}
            className={clsx(className, styles.GalleryVertical)}
            childRef={childRef}
        />
    );
}

export interface HorizontalGalleryProps {
    items: GalleryItem[];
    rows: number;
    groupClassName?: string;
    className?: string;
    childRef?: RefObject<HTMLDivElement>;
}

function Horizontal({
    items,
    className,
    rows,
    groupClassName = styles.group300,
    childRef,
}: HorizontalGalleryProps) {
    const groups = createHorizontalLayout(items, rows);

    return (
        <Gallery
            items={groups}
            className={clsx(className, styles.GalleryHorizontal)}
            groupClassName={groupClassName}
            childRef={childRef}
        />
    );
}

export interface CarouselGalleryProps {
    items: GalleryItem[];
    rows: number;
    className?: string;
    speed?: number;
    direction?: "left" | "right";
    height?: number;
    gap?: number;
}

function CarouselGallery({
    items,
    rows,
    className,
    speed,
    direction = "left",
    height = 300,
    gap = 4,
}: CarouselGalleryProps) {
    const groups = createHorizontalLayout(items, rows);

    return (
        <div
            className={clsx(className, "flex flex-col")}
            style={{
                gap: `${gap}px`,
            }}
        >
            {groups.map((group, i) => (
                <Carousel
                    direction={direction}
                    speed={speed}
                    key={i}
                    child={
                        <div
                            className="flex flex-row flex-nowrap"
                            style={{
                                gap: `${gap}px`,
                                marginRight: `${gap}px`,
                            }}
                        >
                            {group.map((item, j) => (
                                <div
                                    key={j}
                                    style={{
                                        height: height,
                                        aspectRatio: item.aspectRatio,
                                    }}
                                >
                                    {item.component}
                                </div>
                            ))}
                        </div>
                    }
                    childSize={group
                        .map((item) => item.aspectRatio * height + gap)
                        .reduce((a, b) => a + b, 0)}
                />
            ))}
        </div>
    );
}

Gallery.Vertical = Vertical;
Gallery.Horizontal = Horizontal;
Gallery.Carousel = CarouselGallery;

export default Gallery;
