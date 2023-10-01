import { ALL_TRANSACTIONS } from "@/db/transactions";
import { Transaction } from "@/types/transaction";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");
  const filteredTransactions =
    startDate && endDate
      ? ALL_TRANSACTIONS.filter(
          (i: Transaction) => i.date <= endDate && i.date >= startDate,
        )
      : ALL_TRANSACTIONS;

  return NextResponse.json({ data: filteredTransactions }, { status: 200 });
}
