import { connectMongoDB } from "@/lib/mongodb"
import { AuthSigningModel } from "@/models/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const data = await request.json()
    //1 Generate 6 digit pinCode

    //2 Save pinCode and email address in db

    //3 Send pinCode to email address
    
    // await connectMongoDB()
    // await AuthSigningModel.updateOne({}, data, { upsert: true })
    return NextResponse.json({ message: "Settings updated." }, { status: 201 })
}