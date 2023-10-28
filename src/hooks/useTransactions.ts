import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { getTransactions } from "@/functions/api/transactions";
import { useContext, useEffect } from "react";

export default function useTransactions(){
    const { selectedDate } = useContext(DateContext);
    const {setTransactionsStatus, setTransactions} = useContext(TransactionContext)
    useEffect(() => {
        setTransactionsStatus("loading")
        getTransactions(selectedDate.startDate, selectedDate.endDate)
          .then((response: any) => {
            setTransactions(response);
            setTransactionsStatus("success");
          })
          .catch((err: any) => {
            console.log(err);
            setTransactionsStatus("error")});
      }, [selectedDate, setTransactions, setTransactionsStatus]);
}
