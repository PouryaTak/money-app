import { convertChartData } from "@/functions/statistics"
import { VictoryContainer, VictoryPie } from "victory"
import React from "react"
import { numberSeparator } from "@/functions/handle-numbers"
import DropDown from "@/components/drop-down"
import { ChartProps } from "@/types/general"

export default function ChartView({ data, items, selected, setSelected, isLoading }: ChartProps) {
    return (
        <div className="h-full overflow-y-auto px-5">
            <DropDown items={items} selected={selected} setSelected={setSelected} />
            {isLoading && (
                <div className="w-[200px] h-[200px] rounded-full border-[50px] border-slate-200 animate-pulse mx-auto"></div>
            )}
            <div className="flex">
              <span></span>
                <div className="flex flex-col">
                    {data.map((item) => (
                        <div
                            key={`${item.id}-${item.category}`}
                            className="flex flex-col px-2 mb-2 border-l-8 text-sm"
                            style={{ borderLeftColor: item.color }}
                        >
                            <span className="mb-1">{item.category}</span>
                            <span>
                                {numberSeparator(item.amount)}
                                <span className="text-slate-300 leading-6"> IRR</span>
                            </span>
                        </div>
                    ))}
                </div>
                <VictoryPie
                    data={convertChartData(data)}
                    colorScale={convertChartData(data).map((item: any) => item.color)}
                    containerComponent={<VictoryContainer responsive={false} className="mx-auto" />}
                    labelPlacement="perpendicular"
                    labels={() => ""}
                    innerRadius={70}
                    padAngle={2}
                    height={200}
                    width={200}
                />
            </div>
        </div>
    )
}
