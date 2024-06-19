import Hotjar from "@/components/util/Hotjar";

import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Hotjar />
            <body>{children}</body>
        </html>
    );
}
