import MuxVideoPlayer from "@mux/mux-video-react";
import clsx from "clsx";
import { RefObject } from "react";

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
    childRef?: RefObject<HTMLVideoElement>;
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
    childRef,
}: VideoProps) {
    const {
        playing = true,
        muted = true,
        loop = true,
        onEnded = () => null,
    } = videoOptions;

    return (
        <MuxVideoPlayer
            className={clsx(className, styles.Video)}
            playbackId={src.asset.playbackId}
            maxResolution="720p"
            onCanPlay={onReady}
            autoPlay={playing}
            muted={muted}
            loop={loop}
            onEnded={onEnded}
            ref={childRef}
        />
    );
}
