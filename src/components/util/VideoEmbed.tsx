"use client";

import { useEffect, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

import { useHasWindow } from "@/util/hooks";

export interface VideoProps extends ReactPlayerProps {
    url: string;
    controls?: boolean;
}

export function VideoEmbed({ controls = true, ...props }: VideoProps) {
    const hasWindow = useHasWindow();
    return (
        <>
            {hasWindow && (
                <ReactPlayer
                    {...props}
                    controls={controls}
                    width="100%"
                    height="100%"
                />
            )}
        </>
    );
}
