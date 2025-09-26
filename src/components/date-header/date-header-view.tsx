import React from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function DateHeaderView({
    goNext,
    goPrev,
    resetDate,
    date,
    dictionary,
}: {
    goNext: () => void
    goPrev: () => void
    resetDate: () => void
    date: string
    dictionary: any
}) {
    return (
        <div className="w-full flex justify-between p-5 pb-0">
            <Button
                variant="default"
                size="icon"
                className="w-8 h-8 bg-orange-100 hover:bg-orange-200 text-primary rounded-lg"
                onClick={goPrev}
            >
                <Minus aria-hidden />
                <span className="sr-only">{dictionary["date-header"]["go-previous-month"]}</span>
            </Button>
            <span className="text-base font-bold cursor-pointer" title="reset" onClick={resetDate}>
                {date}
            </span>
            <Button
                variant="default"
                size="icon"
                className="w-8 h-8 bg-orange-100 hover:bg-orange-200 text-primary rounded-lg"
                onClick={goNext}
            >
                <Plus aria-hidden />
                <span className="sr-only">{dictionary["date-header"]["go-next-month"]}</span>
            </Button>
        </div>
    )
}
