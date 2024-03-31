import { connectMongoDB } from "@/lib/mongodb"
import TransactionModel from "@/models/transactions"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import UserModel from "@/models/user"

export async function POST(request: Request) {
    const data = await request.json()
    await connectMongoDB()

    const session = await getServerSession()
    const email = session?.user?.email
    const hasUser = await UserModel.findOne({ email })
    if (!hasUser || !email) {
        return NextResponse.json({ message: "You don't have permission" }, { status: 403 })
    }
    const newData = { ...data, owner: email }
    await TransactionModel.create(newData)
    const transaction = await TransactionModel.findOne({id: data.id})
    return NextResponse.json({ message: "Transaction created", transaction }, { status: 201 })
}

export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await TransactionModel.findByIdAndDelete(id)
    return NextResponse.json({ message: "Transaction deleted" }, { status: 200 })
}
