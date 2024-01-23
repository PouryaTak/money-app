import { NextResponse } from "next/server"
import checkDbUser from "@/functions/check-dbUser"
import { initialSettingsState } from "@/helpers/static-data"
import { connectMongoDB } from "@/lib/mongodb"
import SettingsModel from "@/models/settings"

export async function POST(request: Request) {
    const data = await request.json()
    await connectMongoDB()
    const { email } = await checkDbUser()
    if (!email) return NextResponse.json({ message: "You don't have permission" }, { status: 403 })

    await SettingsModel.updateOne({}, { ...data, owner: email }, { upsert: true })
    return NextResponse.json({ message: "Settings updated." }, { status: 201 })
}

export async function GET(request: any) {
    await connectMongoDB()
    const email = request.nextUrl.searchParams.get("email")
    const settingsOfUser = await SettingsModel.find({ owner: email })

    if (!settingsOfUser.length && email) {
        await SettingsModel.updateOne({}, { ...initialSettingsState, owner: email }, { upsert: true })
    }

    const { lang, calender, currency } = settingsOfUser[0] || initialSettingsState
    const settings = { lang, calender, currency }

    return NextResponse.json({ settings }, { status: 200 })
}
