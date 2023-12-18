import React from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type UsernameFormProps = {
    email: string
    handleInputChange: (value: string, name: string) => void
    handleSendVerification: (e: React.FormEvent) => void
}
export default function UsernameForm({email, handleInputChange, handleSendVerification}:UsernameFormProps) {
    return (
        <form onSubmit={handleSendVerification}>
            <div className="w-full md:w-80 mx-auto">
            <label htmlFor="email">Email</label>
            <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e.target.value, 'email')}
                placeholder="yourEmail@mail.com"
                required
                autoFocus
                autoComplete="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                className="mb-4"
                />
                </div>
            <Button className="w-full md:w-80 mx-auto block mb-4" disabled={!email}>
                Send Verification Code
            </Button>
            <p className="text-sm text-gray-500 text-center">By providing email, we&apos;ll send you a verification code.</p>
        </form>
    )
}
