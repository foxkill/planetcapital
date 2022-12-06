//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import moneyformat from "@/utils/moneyformat"
import { IHeatmapData } from "@/types/iheatmapdata"

type HeatmapChartData = {
    heatmap: IHeatmapData[]
}

const HeatmapChart: React.FC<HeatmapChartData> = (props): JSX.Element | null => {
    if (!props.heatmap || props.heatmap.length === 0) {
        return null
    }

    return (<>
        <ResponsiveHeatMap
            data={props.heatmap}
            // cellComponent="circle"
            borderRadius={1}
            xOuterPadding={0.2}
            tooltip={(tt): JSX.Element | null => {
                if (!tt) {
                    return null;
                }

                return (
                    <>
                        <div className="alert shadow-lg">
                            <div className="flex items-center gap-2">
                                <div>
                                    <div className="min-w-full pb-1">
                                        <div className="align-middle inline-block w-4 h-4" style={{ backgroundColor: tt.cell.color, border: "1px solid " + tt.cell.borderColor }}>
                                        </div>
                                        <div className="inline-block leading-4 align-middle indent-2">{tt.cell.data.x}</div>
                                    </div>
                                    <hr className="border-1 border-slate-300 pb-1"></hr>
                                    <div className="text-xs">{tt.cell.serieId}</div>
                                    <div className="font-bold">
                                        {moneyformat(tt.cell.data.value, false, 3) + " "}
                                    </div>
                                    {tt.cell.label}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }}
            // cellBorderWidth={2}
            // cellBorderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
            forceSquare={false}
            hoverTarget="rowColumn"
            motionConfig="wobbly"
            // motionStiffness={80}
            // motionDamping={9}
            // cellHoverOthersOpacity={0.25}
            margin={{ top: 90, right: 10, bottom: 10, left: 130 }}
            // valueFormat=">-.2s"
            labelTextColor={{ from: "color", modifiers: [["darker", 4]] }}
            label={(d): string => {
                let value = (d.value ?? 0) * 100
                return ((value < 0) ? "(" + (-1 * value).toFixed(2) + "%)" : value.toFixed(2) + "%")
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
                // type: "quantize",
                scheme: "red_yellow_green",
                divergeAt: 0.33,
                steps: 12
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