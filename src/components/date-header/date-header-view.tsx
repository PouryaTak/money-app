import React from "react"
import { Button } from "@/components/ui/button"

export default function DateHeaderView({
    goNext,
    goPrev,
    date,
}: {
    goNext: () => void
    goPrev: () => void
    date: string
}) {
    return (
        <div className="w-full flex justify-between py-5">
            <Button variant="secondary" onClick={goPrev}>
                Prev
            </Button>
            <h2 className="text-xl font-bold mt-2">{date}</h2>
            <Button variant="secondary" onClick={goNext}>
                Next
            </Button>
        </div>
    )
}
