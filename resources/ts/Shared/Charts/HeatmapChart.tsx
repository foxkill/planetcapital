//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import moneyformat from "@/utils/moneyformat"

type HeatmapChartData = {
    heatmap: IHeatmapData[]
}

const HeatmapChart: React.FC<HeatmapChartData> = (props): JSX.Element => {
    return (<>
        <ResponsiveHeatMap data={props.heatmap}
            // cellComponent="circle"
            tooltip={(tt): JSX.Element|null => {
                if (!tt) {
                    return null;
                }

                return (
                    <>
                        <div className="alert shadow-lg">
                            <div>
                                <div className="w-4 h-4" style={{backgroundColor:tt.cell.color, border: "1px solid " + tt.cell.borderColor}}></div>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill={tt.cell.color} viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                                <div>
                                    {tt.cell.serieId}: 
                                </div>
                                <div className="font-bold">
                                    {moneyformat(tt.cell.data.val, false, 3) + " "}
                                </div>
                                <div>
                                    {tt.cell.label}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }}
            cellBorderWidth={2}
            cellBorderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
            forceSquare={false}
            hoverTarget="rowColumn"
            motionConfig="wobbly"
            motionStiffness={80}
            motionDamping={9}
            cellHoverOthersOpacity={0.25}
            margin={{ top: 90, right: 10, bottom: 10, left: 130 }}
            // valueFormat=">-.2s"
            label={(d): string => {
                // console.log(d)
                switch (d.serieId) {
                    case "Debt/Equity":
                    case "Shares Outstanding":
                    case "Revenue Growth":
                    case "Net Profit Margin":
                    case "Free Cash Flow":
                    case "Cash & Short Term Investments":
                    case "Gross Profit":
                    case "Cost of Revenue":
                    case "Revenue":
                    case "EBITDA":
                    case "Operating Income":
                    case "Net Income":
                    case "Total non-current liabilities":
                    case "Total current liabilities":
                    case "Total non-current assets":
                    case "Total current assets":
                        // console.log(d, d.serieId)
                        let value = (d.value ?? 0) * 100
                        return ((value < 0) ? "(" + (-1*value).toFixed(2)  + "%)" : value.toFixed(2)+"%")
                        return ((d.value ?? 0) * 100).toFixed(2) + "%"
                    default:
                        return moneyformat(d.value, false, 0)
                }
            }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "",
                legendOffset: 46
            }}
            axisRight={null}
            // axisRight={{
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     legend: "Item",
            //     legendPosition: "middle",
            //     legendOffset: 70
            // }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: "Item",
                // legendPosition: "middle",
                // legendOffset: -72
            }}
            colors={{
                type: "diverging",
                scheme: "red_yellow_green",
                divergeAt: 0.6,
                // minValue: -100,
                // maxValue: 100,
            }}
            emptyColor="#555555"
            // legends={[{
            //     anchor: "bottom",
            //     translateX: 0,
            //     translateY: 30,
            //     length: 400,
            //     thickness: 8,
            //     direction: "row",
            //     tickPosition: "after",
            //     tickSize: 3,
            //     tickSpacing: 4,
            //     tickOverlap: false,
            //     tickFormat: ">-.2s",
            //     title: "Value →",
            //     titleAlign: "start",
            //     titleOffset: 4
            // }]}
        //     labelTextColor={{
        //         from: "color",
        //         modifiers: [
        //             [
        //                 "darker",
        //                 1
        //             ]
        //         ]
        //     }}
        />
    </>)
}

export default HeatmapChart