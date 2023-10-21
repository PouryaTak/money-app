import { convertChartData } from "@/functions/statistics";
import { VictoryContainer, VictoryPie } from "victory";
import React from "react";
import { numberSeparator } from "@/functions/handle-numbers";
import DropDown from "@/components/drop-down";
import { ChartProps } from "@/types/general";

export default function ChartView({ data, items, selected, setSelected, isLoading }: ChartProps) {
  return (
    <div className="h-full overflow-y-auto">
      <DropDown items={items} selected={selected} setSelected={setSelected} />
      {
        isLoading && <div className="w-[200px] h-[200px] rounded-full border-[50px] border-slate-200 animate-pulse mx-auto"></div>
      }
      <VictoryPie
        data={convertChartData(data)}
        colorScale={convertChartData(data).map((item: any) => item.color)}
        containerComponent={<VictoryContainer responsive={false} className="mx-auto" />}
        labelPlacement="perpendicular"
        innerRadius={100}
        padAngle={2}
        height={200}
        width={200}
      />
      <br />
      {data.map((item) => (
        <div key={`${item.id}-${item.category}`} className="flex justify-between items-center mb-2">
          <div className="flex gap-3 items-baseline">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <span>{item.category}</span>
          </div>
          <span>
            {numberSeparator(item.amount)}
            <span className="text-slate-300 text-sm leading-6"> IRR</span>
          </span>
        </div>
      ))}
    </div>
  );
}
