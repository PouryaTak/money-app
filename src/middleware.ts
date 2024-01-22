import { NextRequest, NextResponse } from "next/server"
import { getSettings } from "@/functions/api/settings"

const fetchSettings = async () => {
    const response = await getSettings()
    if (response) {
        const nextResponse = NextResponse.next()
        const settings = {
            lang: response.lang,
            calender: response.calender,
            currency: response.currency,
        }
        nextResponse.cookies.set("settings", JSON.stringify(settings), {
            maxAge: 60 * 60 * 24 * 30,
        })
        return nextResponse
    }
}

export async function middleware(request: NextRequest) {
    const hasSettings = request.cookies.has("settings")
    const hasSession =
        request.cookies.has("next-auth.session-token") || request.cookies.has("__Secure-next-auth.session-token")
    const isAuthPage = request.nextUrl.pathname === "/auth"

    if (!hasSession && !isAuthPage) {
        return NextResponse.redirect(new URL(`/auth`, request.url))
    }

    if (hasSession && isAuthPage) {
        return NextResponse.redirect(new URL(`/`, request.url))
    }

    if (!hasSettings && !isAuthPage) {
        return await fetchSettings()
    }
    
    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)"],
}
