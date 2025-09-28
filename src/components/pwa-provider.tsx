"use client"

import { useEffect } from "react"
import PWAInstaller from "./pwa-installer"

export default function PWAProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Register service worker
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/sw.js")
                    .then((registration) => {
                        console.log("SW registered: ", registration)
                    })
                    .catch((registrationError) => {
                        console.log("SW registration failed: ", registrationError)
                    })
            })
        }

        // Handle online/offline status
        const handleOnline = () => {
            console.log("App is online")
            // You can add logic here to sync offline data
        }

        const handleOffline = () => {
            console.log("App is offline")
            // You can add logic here to show offline indicator
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return (
        <>
            {children}
            <PWAInstaller />
        </>
    )
}
