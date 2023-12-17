"use client"
import React, { useState } from "react"
import ContentView from "@/components/content-view"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Auth() {
    const [email, setEmail] = useState("")
    const handleSendVerification = (e: React.FormEvent) => {
      e.preventDefault()
      console.log(email)
    }
    return (
        <ContentView className="px-5">
            <div>card animation</div>
            <form onSubmit={handleSendVerification}>
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourEmail@mail.com"
                    required
                    autoFocus
                    autoComplete="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    className="mb-3"
                ></Input>
                <Button className="w-full" disabled={!email}>Send Verification Code</Button>
            </form>
        </ContentView>
    )
}
