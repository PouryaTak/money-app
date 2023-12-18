import React, { useEffect } from "react"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"

type PinInputProps = {
    onComplete: (value: string) => void
    pinLength?: number
    disabled?: boolean
    hasError?: boolean
    pin: string
    handleInputChange: (value: string, name: string) => void
}
export default function PinInputs({ onComplete, pin, handleInputChange,  pinLength = 6, disabled, hasError }: PinInputProps) {
    // const [value, setValue] = React.useState("")

    const handleComplete = (value: string) => {
        onComplete(value)
    }

    useEffect(() => {
        const input = document.querySelector("input")
        input?.focus()
    }, [])

    useEffect(() => {
        if (hasError && pin.length === pinLength) {
            const input = document.querySelectorAll("input")
            input[pinLength - 1]?.focus()
        }
    }, [hasError, pinLength, pin.length])
    return (
        <div className="!flex rtl:flex-row-reverse gap-3 justify-center mb-4">
            <PinInput
                value={pin}
                onChange={(pin)=> handleInputChange(pin, 'otp')}
                onComplete={handleComplete}
                placeholder=""
                isDisabled={disabled}
            >
                {Array.from(Array(pinLength).keys()).map((i) => (
                    <PinInputField
                        onFocus={(event) => event.target.select()}
                        key={i}
                        className="aspect-square rounded-md border !w-10 text-center ltr"
                    />
                ))}
            </PinInput>
        </div>
    )
}
