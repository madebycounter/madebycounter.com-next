import MuxVideoPlayer from "@mux/mux-video-react";
import clsx from "clsx";

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
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
};

export default function Video({
    src,
    className,
    videoOptions = {},
    onReady,
}: VideoProps) {
    const { autoPlay = true, muted = true, loop = true } = videoOptions;

    return (
        <MuxVideoPlayer
            className={clsx(className, styles.Video)}
            playbackId={src.asset.playbackId}
            onCanPlay={onReady}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
        />
    );
}
