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
        nextResponse.cookies.set("settings", JSON.stringify(settings))
        return nextResponse
    }
}

export async function middleware(request: NextRequest) {
    const hasSettings = request.cookies.has("settings")
    if (hasSettings) {
        return NextResponse.next()
    }
    return await fetchSettings()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)"],
}
