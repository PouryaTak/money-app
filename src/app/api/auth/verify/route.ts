import { connectMongoDB } from "@/lib/mongodb"
import { AuthVerifyModel } from "@/models/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const data = await request.json()
    // Get pinCode from db

    // Check pinCode

    // Create token

    // Save token in db

    // Send token via Cookie in response

    // await connectMongoDB()
    // await AuthVerifyModel.updateOne({}, data, { upsert: true })
    return NextResponse.json({ message: "Settings updated." }, { status: 201 })
}