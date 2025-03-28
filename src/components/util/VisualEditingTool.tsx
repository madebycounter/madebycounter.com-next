"use client";

import { VisualEditing } from "next-sanity";
import { useEffect } from "react";

export function VisualEditingTool() {
    useEffect(() => {
        // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
        if (
            process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" &&
            window === parent &&
            !location.pathname.startsWith("/studio")
        ) {
            location.href = "/api/draft/disable";
        }
    }, []);

    return <VisualEditing />;
}
