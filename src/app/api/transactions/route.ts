import checkDbUser from "@/functions/check-dbUser"
import { connectMongoDB } from "@/lib/mongodb"
import TransactionModel from "@/models/transactions"
import { NextResponse } from "next/server"

export async function GET(request: any) {
    const startDate = request.nextUrl.searchParams.get("startDate")
    const endDate = request.nextUrl.searchParams.get("endDate")
    await connectMongoDB()
    const { email } = await checkDbUser()
    console.log("🚀 -- file: route.ts:11 -- GET -- email:", email)

    if (!email) return NextResponse.json({ message: "You don't have permission" }, { status: 403 })

    const filteredTransactions = await TransactionModel.find({
        date: {
            $gte: startDate,
            $lte: endDate,
        },
        owner: email,
    })
    return NextResponse.json({ data: filteredTransactions })
}
