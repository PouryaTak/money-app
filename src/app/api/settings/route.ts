import { connectMongoDB } from "@/lib/mongodb"
import SettingsModel from "@/models/settings"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const data = await request.json()
    await connectMongoDB()
    await SettingsModel.updateOne({}, data, { upsert: true })
    return NextResponse.json({ message: "Settings updated." }, { status: 201 })
}

export async function GET() {
    await connectMongoDB()
    const settings = await SettingsModel.find({})
    return NextResponse.json({ settings }, { status: 200 })
}
