import { convertChartData } from "@/functions/statistics"
import { VictoryContainer, VictoryPie } from "victory"
import { numberSeparator } from "@/functions/handle-numbers"
import { CategorizedTransaction } from "@/types/transaction"

export default function ChartSection({
    chartData,
    title,
}: {
    chartData: Array<CategorizedTransaction>
    title: string
}) {
    
    return (
        <>
            <span className="text-base font-bold mb-5 block">{title}</span>
            <div className="grid grid-cols-[1fr_auto]">
                <div className="flex flex-wrap">
                    {chartData.map((item) => (
                        <div
                            key={`${item.id}-${item.category}`}
                            className="flex flex-col px-2 mb-2 border-l-8 text-sm h-max"
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
                    data={convertChartData(chartData)}
                    colorScale={convertChartData(chartData).map((item: any) => item.color)}
                    containerComponent={<VictoryContainer responsive={false} />}
                    labels={() => ""}
                    innerRadius={70}
                    padAngle={2}
                    height={200}
                    width={200}
                />
            </div>
        </>
    )
}
