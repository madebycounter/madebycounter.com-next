import { Analytics } from "@vercel/analytics/react";
import { draftMode } from "next/headers";

import Hotjar from "@/components/util/Hotjar";
import { VisualEditingTool } from "@/components/util/VisualEditingTool";

import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="text/javascript"
                    id="hs-script-loader"
                    async
                    defer
                    src={process.env.NEXT_PUBLIC_HUBSPOT_SCRIPT_URL}
                ></script>
            </head>
            <Hotjar />
            <body>
                {draftMode().isEnabled && <VisualEditingTool />}
                {!draftMode().isEnabled && <Analytics />}
                {children}
            </body>
        </html>
    );
}
