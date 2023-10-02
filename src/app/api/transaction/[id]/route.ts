import { connectMongoDB } from "@/lib/mongodb";
import TransactionModel from "@/models/transactions";
import { NextResponse } from "next/server";

export async function PUT(request: Request, context: { params: any }) {
  const { id } = context.params;
  const newData = await request.json();
  await connectMongoDB();
  await TransactionModel.findByIdAndUpdate(id, newData);
  return NextResponse.json(
    { message: " Transaction updated" },
    { status: 200 },
  );
}

export async function GET(request: Request, context: { params: any }) {
  const { id } = context.params;
  await connectMongoDB();
  const transaction = await TransactionModel.findOne({ _id: id });
  return NextResponse.json({ transaction }, { status: 200 });
}
