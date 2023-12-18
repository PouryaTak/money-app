import React from "react"
import PinInputs from "../pin-inputs"
import { Button } from "../ui/button"
import { obscureEmail } from "@/lib/utils"

type VerificationFormProps = {
    pin: string
    email: string
    handleInputChange: (value: string, name: string) => void
    handleVerify: (e: React.FormEvent) => void
}

const pinCodeLength = 6

export default function VerificationForm({ pin, email, handleInputChange, handleVerify }: VerificationFormProps) {
    const emailAddress = obscureEmail(email)

    return (
        <form onSubmit={handleVerify}>
            <p className="mb-4 text-gray-500 text-center">
                A verification code has been sent to <br /> <strong className="text-black">{emailAddress}</strong>.
            </p>

            <PinInputs
                pinLength={pinCodeLength}
                onComplete={(value) => console.log(value)}
                pin={pin}
                handleInputChange={handleInputChange}
            />
            <Button className="w-full md:w-80 mx-auto block mb-4" disabled={pin.length !== pinCodeLength}>
                Verify
            </Button>
        </form>
    )
}
