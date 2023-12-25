import React from "react"
import ContentView from "../content-view"
import WelcomeBanner from "./welcome-banner"
import GoogleAuth from "./google-auth"

export default function AuthContainer() {

    return (
        <ContentView className="px-5 grid grid-rows-[1fr_auto]">
            <WelcomeBanner />
            <GoogleAuth />
        </ContentView>
    )
}
