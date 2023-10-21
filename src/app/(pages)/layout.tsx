import React from "react";
import TransactionProvider from "@/context/transaction-provider";
import DateProvider from "@/context/date-provider";
import DrawerProvider from "@/context/drawer-provider";
import PagesContainer from "@/components/pages-container";
import getTranslations from "@/functions/get-translations";
import DictionaryProvider from "@/context/dictionary-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactElement;
}) {
  const dictionary = await getTranslations();
  return (
    <DateProvider>
      <TransactionProvider>
        <DrawerProvider>
          <DictionaryProvider dictionary={dictionary}>
            <PagesContainer>{children}</PagesContainer>
          </DictionaryProvider>
        </DrawerProvider>
      </TransactionProvider>
    </DateProvider>
  );
}
