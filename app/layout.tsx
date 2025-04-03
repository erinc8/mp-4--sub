import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";


export const metadata: Metadata = {
    title: "Harvard Art App",
    description: "Explore artworks from the Harvard Art Museums API",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <body>
            <Header />
            {children}
        </body>
        </body>
        </html>
    );
}
