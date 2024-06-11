"use client";

import MuxVideoPlayer from "@mux/mux-video-react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

import { useIsVisible } from "@/util/hooks";

import { MuxVideo } from "@/lib/sanity.types";

import styles from "./Video.module.css";

export function getVideoThumbnail(src: MuxVideo, width: number = 1920) {
    return `https://image.mux.com/${src.asset.playbackId}/thumbnail.jpg?width=${width}`;
}

export interface VideoPreviewProps {
    src: MuxVideo;
    className?: string;
    size?: number;
}

export function VideoPreview({ src, size = 10, className }: VideoPreviewProps) {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={getVideoThumbnail(src, size)}
                className={className}
                alt=""
            />
        </>
    );
}

export interface VideoProps {
    src: MuxVideo;
    onReady?: () => void;
    className?: string;
    videoOptions?: VideoOptions;
}

export type VideoOptions = {
    playing?: boolean;
    muted?: boolean;
    loop?: boolean;
    onEnded?: () => void;
};

export default function Video({
    src,
    className,
    videoOptions = {},
    onReady,
}: VideoProps) {
    const {
        playing = true,
        muted = true,
        loop = true,
        onEnded = () => null,
    } = videoOptions;
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVisible = useIsVisible(videoRef, 0);

    useEffect(() => {
        if (!videoRef.current) return;

        console.log(playing, isVisible);

        // TODO: proper error handling
        if (playing && isVisible) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(console.log);
        } else {
            videoRef.current.pause();
        }
    }, [playing, isVisible]);

    return (
        <MuxVideoPlayer
            ref={videoRef}
            className={clsx(className, styles.Video)}
            playbackId={src.asset.playbackId}
            maxResolution="720p"
            onCanPlay={onReady}
            autoPlay={playing && isVisible}
            muted={muted}
            loop={loop}
            onEnded={onEnded}
            disableTracking
        />
    );
}
