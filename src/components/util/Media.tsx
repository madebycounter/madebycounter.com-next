"use client";

import { getImageDimensions } from "@sanity/asset-utils";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { useIsVisible } from "@/util/hooks";

import MediaSize, { Medium, Small } from "@/components/util/MediaSize";

import { MultiMedia, MuxVideo, SanityImage } from "@/lib/types";

import styles from "./Media.module.css";

/* eslint-disable @next/next/no-img-element */

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
    return `https://stream.mux.com/${src.asset.playbackId}/${size.video}.mp4`;
}

function makeImageUrl(src: SanityImage, size: MediaSize) {
    return `${src.asset.url}?w=${size.img}&q=70&sharp=10&fm=webp`;
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
                <Media src={src} mode="contain" size={Small} />
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

export interface ImageProps {
    src: SanityImage;
    size: MediaSize;
    className?: string;
    onReady?: () => void;
    alt?: string;
}

export function Image({ src, className, size, onReady, alt = "" }: ImageProps) {
    const [imgRef, imgLoaded, onImgLoad] = useImageLoaded();

    useEffect(() => {
        if (imgLoaded) onReady?.();
    }, [imgLoaded, onReady]);

    return (
        <img
            ref={imgRef}
            src={makeImageUrl(src, size)}
            alt={alt}
            className={className}
            onLoad={onImgLoad}
            style={{
                objectPosition: src.hotspot
                    ? `${src.hotspot?.x * 100}% ${src.hotspot?.y * 100}%`
                    : "center",
            }}
        />
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
    size?: MediaSize;
}

export default function Media({
    src,
    alt = "",
    onClick,
    onEnded,
    playing,
    loop,
    mode = "cover",
    size = Medium,
    className,
}: MediaProps) {
    const [ready, setReady] = useState(false);

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
                onClick?.(src._key);
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
                <Image
                    src={src}
                    className={styles.Image}
                    onReady={() => setReady(true)}
                    alt={alt}
                    size={size}
                />
            )}
        </div>
    );
}
