"use client";

import ReactPlayer, { ReactPlayerProps } from "react-player";

export interface VideoProps extends ReactPlayerProps {
    url: string;
    controls?: boolean;
}

export function VideoEmbed({ controls = true, ...props }: VideoProps) {
    return (
        <ReactPlayer
            {...props}
            controls={controls}
            width="100%"
            height="100%"
        />
    );
}
