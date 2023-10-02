import { connectMongoDB } from "@/lib/mongodb";
import TransactionModel from "@/models/transactions";
import { NextResponse } from "next/server";

export async function GET(request: any) {
  const startDate = request.nextUrl.searchParams.get("startDate");
  const endDate = request.nextUrl.searchParams.get("endDate");
  await connectMongoDB();
  const filteredTransactions = await TransactionModel.find();
  return NextResponse.json({ data: filteredTransactions });
}
