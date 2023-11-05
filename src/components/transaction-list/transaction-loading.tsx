import React from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function TransactionLoading() {
  return (
    <>
      <Card className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-3 md:p-4 animate-pulse">
        <div className="col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg text-gray-300 bg-gray-200">
          <Loader2 className="animate-spin" />
        </div>
        <span className="col-start-2 col-end-3 row-start-1 w-3/4 row-end-2 h-3 bg-gray-300 mt-1"></span>
        <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex items-center gap-2 h-6 pb-1">
          <span className="bg-gray-200 h-3 text-sm leading-6 w-5"></span>
          <span className="bg-gray-200 h-3 text-sm leading-6 w-2/6"></span>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2 bg-gray-300/75 h-3 ml-auto w-10 mt-1"></div>
        <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 bg-gray-300 h-3 ml-auto w-8 mt-1"></div>
      </Card>
      <Card className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-3 md:p-4 animate-pulse opacity-50">
        <div className="col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg text-gray-300 bg-gray-200">
          <Loader2 className="animate-spin" />
        </div>
        <span className="col-start-2 col-end-3 row-start-1 w-3/4 row-end-2 h-3 bg-gray-300 mt-1"></span>
        <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex items-center gap-2 h-6 pb-1">
          <span className="bg-gray-200 h-3 text-sm leading-6 w-5"></span>
          <span className="bg-gray-200 h-3 text-sm leading-6 w-2/6"></span>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2 bg-gray-300/75 h-3 ml-auto w-10 mt-1"></div>
        <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 bg-gray-300 h-3 ml-auto w-8 mt-1"></div>
      </Card>
      <Card className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-3 md:p-4 animate-pulse opacity-20">
        <div className="col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg text-gray-300 bg-gray-200">
          <Loader2 className="animate-spin" />
        </div>
        <span className="col-start-2 col-end-3 row-start-1 w-3/4 row-end-2 h-3 bg-gray-300 mt-1"></span>
        <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex items-center gap-2 h-6 pb-1">
          <span className="bg-gray-200 h-3 text-sm leading-6 w-5"></span>
          <span className="bg-gray-200 h-3 text-sm leading-6 w-2/6"></span>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2 bg-gray-300/75 h-3 ml-auto w-10 mt-1"></div>
        <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 bg-gray-300 h-3 ml-auto w-8 mt-1"></div>
      </Card>
    </>
  );
}
