"use client";

import Hj from "@hotjar/browser";
import { useEffect } from "react";

export default function Hotjar() {
    useEffect(() => {
        if (
            process.env.NEXT_PUBLIC_HOTJAR_SITE_ID &&
            process.env.NEXT_PUBLIC_HOTJAR_VERSION
        ) {
            Hj.init(
                parseInt(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID),
                parseInt(process.env.NEXT_PUBLIC_HOTJAR_VERSION),
            );
        }
    }, []);

    return <></>;
}
