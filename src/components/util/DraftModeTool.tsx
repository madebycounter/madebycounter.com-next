"use client";

import { useEffect } from "react";

import Action from "@/components/util/Action";

export interface DraftModeToolProps {
    enable?: boolean;
}

export default function DraftModeTool({ enable = false }: DraftModeToolProps) {
    useEffect(() => {
        if (enable) {
            fetch("/api/draft/enable", { method: "GET" }).then(() => {
                window.location.href = "/";
            });
        }
    }, [enable]);

    return (
        <Action
            onClick={() => {
                fetch("/api/draft/disable", { method: "GET" }).then(() => {
                    location.reload();
                });
            }}
            className="fixed bottom-0 left-0 z-50 m-8 rounded-md bg-red-600 p-2 text-xl text-white"
        >
            return to live site
        </Action>
    );
}
