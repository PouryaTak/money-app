import checkDbUser from "@/functions/check-dbUser"
import { connectMongoDB } from "@/lib/mongodb"
import TransactionModel from "@/models/transactions"
import { NextResponse } from "next/server"
import { types } from "sass"

export async function GET(request: any) {
    const startDate = request.nextUrl.searchParams.get("startDate")
    const endDate = request.nextUrl.searchParams.get("endDate")
    const categories = request.nextUrl.searchParams.get("category")
    const type = request.nextUrl.searchParams.get("type")
    await connectMongoDB()
    const { email } = await checkDbUser()

    if (!email) return NextResponse.json({ message: "You don't have permission" }, { status: 403 })

    const filteredTransactions = await TransactionModel.find({
        date: {
            $gte: startDate,
            $lte: endDate,
        },
        owner: email,
        ...(categories ? { category: { $in: categories?.split(",") } } : {}),
        ...(type ? { type: { $in: type.split(",") } } : {}),
    })
    return NextResponse.json({ data: filteredTransactions, message: "" })
}
