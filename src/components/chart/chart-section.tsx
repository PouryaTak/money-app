import { convertChartData } from "@/functions/statistics"
import { VictoryContainer, VictoryPie } from "victory"
import { numberSeparator } from "@/functions/handle-numbers"
import { CategorizedTransaction } from "@/types/transaction"

export default function ChartSection({
    chartData,
    title,
    currency
}: {
    chartData: Array<CategorizedTransaction>
    title: string
    currency:string
}) {
    
    return (
        <>
            <span className="text-base font-bold mb-5 block">{title}</span>
            <div className="flex flex-col items-center">
            <VictoryPie
                    data={convertChartData(chartData)}
                    colorScale={convertChartData(chartData).map((item: any) => item.color)}
                    containerComponent={<VictoryContainer responsive={false} />}
                    labels={() => ""}
                    innerRadius={70}
                    padAngle={2}
                    height={200}
                    width={200}
                />
                <div className="flex flex-wrap w-full">
                    {chartData.map((item) => (
                        <div
                            key={`${item.id}-${item.category}`}
                            className="flex w-full justify-between items-center px-2 mb-2 border-l-8 text-sm h-max"
                            style={{ borderLeftColor: item.color }}
                        >
                          <div className="flex gap-2 items-center">
                          <span className="mb-1">{item.category}</span>
                          <span className="mb-1">-</span>
                            <span className="text-xs">{item.percentage} %</span>
                          </div>
                            <span className="mb-1">
                                {numberSeparator(item.amount)}
                                <span className="text-slate-300 leading-6 mx-1">{currency}</span>
                            </span>
                          
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
