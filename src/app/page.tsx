'use client'
import Balance from "@/components/balance-view";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import TransactionProvider from "@/context/transaction-provider";

export default function Home() {
  return (
    <TransactionProvider>
      <main className="max-w-5xl mx-auto relative overflow-hidden bg-slate-200 min-h-screen p-5">
        <TransactionForm />
        <Balance/>
        <TransactionList />
      </main>
    </TransactionProvider>
  );
}
