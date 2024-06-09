import { MuxVideo } from "@/lib/sanity.types";
import MuxVideoPlayer from "@mux/mux-video-react";
import styles from "./Video.module.css";
import clsx from "clsx";

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
}

export default function Video({ src, className, onReady }: VideoProps) {
    return (
        <MuxVideoPlayer
            className={clsx(className, styles.Video)}
            playbackId={src.asset.playbackId}
            onCanPlay={onReady}
            autoPlay
            muted
            loop
        />
    );
}
