"use client"
import React, { useState } from "react"
import AuthContainer from "@/components/auth/auth-container"

export default function Auth() {
    const [email, setEmail] = useState("")
    const handleSendVerification = (e: React.FormEvent) => {
      e.preventDefault()
      console.log(email)
    }
    return (
        <AuthContainer/>
    )
}
