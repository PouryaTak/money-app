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

export async function GET() {
    await connectMongoDB()
    const { email } = await checkDbUser()
    if (!email) return NextResponse.json({ settings: initialSettingsState }, { status: 200 })
    const settingsFromDb = await SettingsModel.find({ owner: email })
    return NextResponse.json({ settings: settingsFromDb[0] }, { status: 200 })
}
