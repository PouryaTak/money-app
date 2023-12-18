import React from "react"
import ContentView from "../content-view"
import UsernameForm from "./username-form"
import WelcomeBanner from "./welcome-banner"
import VerificationForm from "./verification-form"

export default function AuthContainer() {
    const [userCredentials, setUserCredentials] = React.useState({ email: "", otp: "" })
    const [otpSent, setOtpSent] = React.useState(false)
    const handleInputChange = (value: string, name: string) => {
        setUserCredentials((oldVal) => {
            return {
                ...oldVal,
                [name]: value,
            }
        })
    }
    const handleSendVerification = (e: React.FormEvent) => {
        e.preventDefault()
        setOtpSent(true)
        console.log(userCredentials)
    }
    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(userCredentials)
    }
    return (
        <ContentView className="px-5 grid grid-rows-[1fr_auto]">
            <WelcomeBanner />
            {
                otpSent
                    ? <VerificationForm
                        pin={userCredentials.otp}
                        email={userCredentials.email}
                        handleInputChange={handleInputChange}
                        handleVerify={handleVerify}
                    />
                    : <UsernameForm
                        email={userCredentials.email}
                        handleInputChange={handleInputChange}
                        handleSendVerification={handleSendVerification}
                    />
            }
        </ContentView>
    )
}
