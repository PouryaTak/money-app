import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    const hasSession = request.cookies.has("next-auth.session-token") || request.cookies.has("__Secure-next-auth.session-token")
    const isAuthPage = request.nextUrl.pathname === "/auth"

    if (!hasSession && !isAuthPage) {
        return NextResponse.redirect(new URL(`/auth`, request.url))
    }

    if (hasSession && isAuthPage) {
        return NextResponse.redirect(new URL(`/`, request.url))
    }
    
    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)"],
}
