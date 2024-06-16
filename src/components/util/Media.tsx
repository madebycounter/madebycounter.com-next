"use client";

import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useIsVisible } from "@/util/hooks";

import { MultiMedia, MuxVideo, SanityImage } from "@/lib/types";

import styles from "./Media.module.css";

/* eslint-disable @next/next/no-img-element */

export type MediaSize = "small" | "medium" | "large";

export function getAspectRatio(src: MultiMedia) {
    if (src._type === "mux.video") {
        let split = src.asset.data.aspect_ratio.split(":");
        return parseInt(split[0]) / parseInt(split[1]);
    }

    return getImageDimensions(src).aspectRatio;
}

export function getVideoThumbnail(src: MuxVideo, size: number = 100) {
    return `https://image.mux.com/${src.asset.playbackId}/thumbnail.webp?width=${size}`;
}

function makeVideoUrl(src: MuxVideo, size: MediaSize) {
    if (size === "small" || size === "medium")
        return `https://stream.mux.com/${src.asset.playbackId}/low.mp4`;
    return `https://stream.mux.com/${src.asset.playbackId}/medium.mp4`;
}

function makeImageUrl(src: SanityImage, size: MediaSize) {
    if (size === "small") return `${src.asset.url}?w=480&q=50&sharp=10&fm=webp`;
    if (size === "medium")
        return `${src.asset.url}?w=1028&q=70&sharp=10&fm=webp`;
    return `${src.asset.url}?w=1920&q=75&sharp=1&fm=webp`;
}

function useImageLoaded(): [
    React.RefObject<HTMLImageElement>,
    boolean,
    () => void,
] {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    const onLoad = () => {
        setLoaded(true);
    };

    useEffect(() => {
        if (ref.current && ref.current.complete) {
            onLoad();
        }
    });

    return [ref, loaded, onLoad];
}

export interface MediaPreviewProps {
    src: MultiMedia;
    className?: string;
}

export function MediaPreview({ src, className }: MediaPreviewProps) {
    return (
        <div
            style={{
                aspectRatio: getAspectRatio(src),
            }}
        >
            {src._type === "mux.video" && (
                <img
                    className={className}
                    src={`https://image.mux.com/${src.asset.playbackId}/thumbnail.webp?width=200`}
                    alt=""
                />
            )}

            {src._type === "image" && (
                <Media src={src} mode="contain" size="small" />
            )}
        </div>
    );
}

export interface VideoProps {
    src: string;
    className?: string;
    onReady?: () => void;
    onEnded?: () => void;
    playing?: boolean;
    loop?: boolean;
}

export function Video({
    src,
    className,
    onReady,
    onEnded,
    playing = true,
    loop = true,
}: VideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVisible = useIsVisible(videoRef, 0);

    useEffect(() => {
        if (!videoRef.current) return;

        // TODO: proper error handling
        if (playing && isVisible) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.log);
        } else {
            videoRef.current.pause();
        }
    }, [playing, isVisible]);

    return (
        <video
            ref={videoRef}
            className={className}
            onCanPlay={onReady}
            loop={loop}
            onEnded={onEnded}
            playsInline
            muted
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}

export interface MediaProps {
    src: MultiMedia;
    alt?: string;
    onClick?: (key: string) => void;
    onEnded?: () => void;
    playing?: boolean;
    loop?: boolean;
    className?: string;
    mode?: "height" | "width" | "cover" | "contain";
    size?: "small" | "medium" | "large";
}

export default function Media({
    src,
    alt = "",
    onClick,
    onEnded,
    playing,
    loop,
    mode = "cover",
    size = "medium",
    className,
}: MediaProps) {
    const [ready, setReady] = useState(false);
    const [imgRef, imgLoaded, onImgLoad] = useImageLoaded();

    useEffect(() => {
        if (imgLoaded) setReady(true);
    }, [imgLoaded]);

    return (
        <div
            className={clsx(styles.Media, className, {
                [styles.Media__width]: mode === "width",
                [styles.Media__height]: mode === "height",
                [styles.Media__cover]: mode === "cover",
                [styles.Media__contain]: mode === "contain",
                [styles.clickable]: onClick,
            })}
            style={
                {
                    "--aspect-ratio": `${getAspectRatio(src)}`,
                } as React.CSSProperties
            }
            onClick={() => {
                if (onClick) onClick(src._key);
            }}
        >
            <div
                className={clsx(styles.Preview, {
                    [styles.Preview__hidden]: ready,
                })}
                style={{
                    backgroundColor:
                        src._type === "mux.video"
                            ? "grey"
                            : src.asset.metadata.palette.dominant.background,
                }}
            />

            {src._type === "mux.video" && (
                <Video
                    src={makeVideoUrl(src, size)}
                    onReady={() => setReady(true)}
                    onEnded={onEnded}
                    playing={playing}
                    loop={loop}
                    className={styles.Video}
                />
            )}

            {src._type === "image" && (
                <img
                    ref={imgRef}
                    src={makeImageUrl(src, size)}
                    alt={alt}
                    onLoad={onImgLoad}
                    className={styles.Image}
                />
            )}
        </div>
    );
}
