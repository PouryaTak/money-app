import "./globals.css"
import type { Metadata } from "next"
import { cookies } from "next/dist/client/components/headers"
import { Vazirmatn } from "next/font/google"

const vazir = Vazirmatn({
    subsets: ["arabic", "latin", "latin-ext"],
    weight: ["400", "200", "700"],
})

export const metadata: Metadata = {
    title: "Money App - Expense Tracker",
    description: "Track your expenses and incomes with ease. A powerful personal finance management app.",
    manifest: "/manifest.json",
    themeColor: "#F77D2A",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Money App",
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: "Money App",
        title: "Money App - Expense Tracker",
        description: "Track your expenses and incomes with ease",
    },
    icons: {
        icon: [
            { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/icon-192x192.png", sizes: "192x192", type: "image/png" }],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const lang = cookies().get("language")?.value || "en-US"
    return (
        <html lang={lang}>
            <body className={vazir.className}>{children}</body>
        </html>
    )
}
