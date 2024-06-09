import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
    title: "Counter | About",
    description: "Your local media production company.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
