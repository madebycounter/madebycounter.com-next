import clsx from "clsx";
import seededShuffle from "@/util/seededShuffle";

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
    getSize: (item: GalleryItem) => number
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
            prev.size < curr.size ? prev : curr
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
    className?: string;
    groupClassName?: string;
}

function Gallery({ items = [], className, groupClassName }: GalleryProps) {
    return (
        <div className={className}>
            {items.map((group, i) => (
                <div key={i} className={clsx(styles.group, groupClassName)}>
                    {group.map((item, j) => (
                        <div
                            key={j}
                            className={clsx(styles.item)}
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
}

function Vertical({ items, columns, className }: VerticalGalleryProps) {
    const groups = createVerticalLayout(items, columns);

    return (
        <Gallery
            items={groups}
            className={clsx(className, styles.GalleryVertical)}
        />
    );
}

export interface HorizontalGalleryProps {
    items: GalleryItem[];
    rows: number;
    groupClassName?: string;
    className?: string;
}

function Horizontal({
    items,
    className,
    rows,
    groupClassName = styles.group300,
}: HorizontalGalleryProps) {
    const groups = createHorizontalLayout(items, rows);

    return (
        <Gallery
            items={groups}
            className={clsx(className, styles.GalleryHorizontal)}
            groupClassName={groupClassName}
        />
    );
}

Gallery.Vertical = Vertical;
Gallery.Horizontal = Horizontal;

export default Gallery;
