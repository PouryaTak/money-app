import { cn } from "@/lib/utils"
import React from "react"

export default function ContentView({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "relative w-full max-w-5xl h-full py-5 pt-0 mx-auto overflow-y-hidden bg-white",
                className
            )}
        >
            {children}
        </div>
    )
}
