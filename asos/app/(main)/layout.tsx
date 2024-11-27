import NavBar from "@/components/NavBar";

export const metadata = {
    title: "My App",
    description: "A Next.js app with PWA support",
    themeColor: "#000000", // Set theme color for PWA
};

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#000000" />
        </head>
        <body className="bg-white min-h-screen">
        <NavBar />
        {children}
        </body>
        </html>
    );
}
