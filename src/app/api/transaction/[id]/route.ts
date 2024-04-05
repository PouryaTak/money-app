import { connectMongoDB } from "@/lib/mongodb"
import TransactionModel from "@/models/transactions"
import { NextResponse } from "next/server"

export async function PUT(request: Request, context: { params: any }) {
    try {
        const { id } = context.params
        const newData = await request.json()
        await connectMongoDB()
        await TransactionModel.findByIdAndUpdate(id, newData)
        return NextResponse.json({ message: " Transaction updated", transaction: newData }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "can not update", transaction: [] }, { status: 500 })
    }
}

export async function GET(request: any) {
    try {
        const id = request.nextUrl.pathname.split("/").pop()
        await connectMongoDB()
        const transaction = await TransactionModel.findOne({ _id: id })
        return NextResponse.json({ transaction, message: "" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "can not get detail", transaction: [] }, { status: 500 })
    }
}
