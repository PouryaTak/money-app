import Balance from "@/components/balance-view";
import TransactionListContainer from "@/components/transaction-list/transaction-list-container";

export default function Home() {
  return (
    <>
      <Balance />
      <TransactionListContainer />
    </>
  );
}
