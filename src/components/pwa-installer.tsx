"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[]
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed"
        platform: string
    }>
    prompt(): Promise<void>
}

export default function PWAInstaller() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showInstallPrompt, setShowInstallPrompt] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true)
            return
        }

        // Listen for the beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            setShowInstallPrompt(true)
        }

        // Listen for the appinstalled event
        const handleAppInstalled = () => {
            setIsInstalled(true)
            setShowInstallPrompt(false)
            setDeferredPrompt(null)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        window.addEventListener("appinstalled", handleAppInstalled)

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
            window.removeEventListener("appinstalled", handleAppInstalled)
        }
    }, [])

    const handleInstallClick = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === "accepted") {
            console.log("User accepted the install prompt")
        } else {
            console.log("User dismissed the install prompt")
        }

        setDeferredPrompt(null)
        setShowInstallPrompt(false)
    }

    const handleDismiss = () => {
        setShowInstallPrompt(false)
        // Store dismissal in localStorage to avoid showing again for a while
        localStorage.setItem("pwa-install-dismissed", Date.now().toString())
    }

    // Don't show if already installed or if user recently dismissed
    if (isInstalled || !showInstallPrompt) {
        return null
    }

    // Check if user recently dismissed (within 7 days)
    const dismissedTime = localStorage.getItem("pwa-install-dismissed")
    if (dismissedTime) {
        const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24)
        if (daysSinceDismissed < 7) {
            return null
        }
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
            <div className="bg-white rounded-lg shadow-lg border p-4 flex items-center gap-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">Install Money App</h3>
                    <p className="text-xs text-gray-600">Get quick access and work offline</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={handleInstallClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        <Download size={14} className="mr-1" />
                        Install
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleDismiss}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={14} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
