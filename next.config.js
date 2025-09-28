const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
            {
                // Service worker headers
                source: "/sw.js",
                headers: [
                    { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
                    { key: "Service-Worker-Allowed", value: "/" },
                ],
            },
            {
                // Manifest headers
                source: "/manifest.json",
                headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**",
            },
        ],
    },
}

module.exports = withBundleAnalyzer(nextConfig)
