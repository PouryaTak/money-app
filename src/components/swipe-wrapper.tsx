"use client"
import useDateController from "@/hooks/useDateController"
import { Settings } from "@/types/settings"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { FC, useMemo, useRef, useState } from "react"

const SwipeWrapper: FC<{ children: React.ReactElement, settings:Settings  }> = ({ children, settings }) => {
    const touchStart = useRef(0)
    const touchEnd = useRef(0)
    const [movement, setMovement] = useState(0)
    const {goPreviousDate, goNextDate} = useDateController(settings)
    const THRESHOLD = 150

    const delayedMovement = useMemo(() => {
        if (touchEnd.current === 0) return 0
        const movementSign = movement / Math.abs(movement)
        return Math.abs(movement) > THRESHOLD ? movement - THRESHOLD * movementSign : 0
    }, [movement])
    const handleTouch = (e: React.TouchEvent<HTMLDivElement>, type: "start" | "end") => {
        const event = e.targetTouches[0].clientX
        if (type === "start") {
            touchEnd.current = 0
            touchStart.current = event
        } else {
            touchEnd.current = event
        }
        setMovement(touchEnd.current - touchStart.current)
    }

    const calculateTouch = () => {
        const currentMovement = touchEnd.current - touchStart.current
        if (THRESHOLD <= Math.abs(currentMovement) && touchEnd.current !== 0) {
            currentMovement > 0 ? goPreviousDate() : goNextDate()
        }
        touchStart.current = 0
        touchEnd.current = 0
        setMovement(0)
    }
    return (
        <div
            onTouchStart={(e) => handleTouch(e, "start")}
            onTouchMove={(e) => handleTouch(e, "end")}
            onTouchEnd={calculateTouch}
            className="h-full overflow-y-auto"
        >
            <div
                className="fixed top-0 left-0 max-w-20 h-full bg-gradient-to-r rounded-r-[100%]  from-white select-none pointer-events-none"
                style={{ width: `${delayedMovement < 100 ? delayedMovement : 100}px` }}
            >
                <ChevronLeft
                    size={delayedMovement < 0 ? 0 : delayedMovement < 40 ? delayedMovement : 40}
                    className="top-1/2 -translate-y-1/2 relative ml-3 text-gray-600"
                />
            </div>
            <div
                className="fixed top-0 right-0 max-w-20 h-full bg-gradient-to-l rounded-l-[100%] from-white select-none pointer-events-none"
                style={{
                    width: `${delayedMovement >= 0 ? 0 : delayedMovement > -100 ? Math.abs(delayedMovement) : 100}px`,
                }}
            >
                <ChevronRight
                    size={Math.abs(delayedMovement) < 40 ? Math.abs(delayedMovement) : 40}
                    className="top-1/2 -translate-y-1/2 relative ml-auto mr-3 text-gray-600"
                />
            </div>
            {children}
        </div>
    )
}

export default SwipeWrapper
