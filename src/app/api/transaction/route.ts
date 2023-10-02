import { connectMongoDB } from "@/lib/mongodb";
import TransactionModel from "@/models/transactions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  await connectMongoDB();
  await TransactionModel.create(data);
  return NextResponse.json({ message: "Transaction created" }, { status: 201 });
}

export async function DELETE(request: any) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await TransactionModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
}
