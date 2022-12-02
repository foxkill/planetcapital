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
            cellComponent="circle"
            hoverTarget="row"
            margin={{ top: 90, right: 110, bottom: 90, left: 110 }}
            // valueFormat=">-.2s"
            label={(d): string => {
                console.log(d)
                return moneyformat(d.value, false, 0)
            }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "",
                legendOffset: 46
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Item",
                legendPosition: "middle",
                legendOffset: 70
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Item",
                legendPosition: "middle",
                legendOffset: -72
            }}
            colors={{
                type: "diverging",
                scheme: "red_yellow_green",
                divergeAt: 0.5,
                minValue: -100000000000,
                maxValue: 100000000000
            }}
            emptyColor="#555555"
            legends={[{
                anchor: "bottom",
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: "row",
                tickPosition: "after",
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: ">-.2s",
                title: "Value →",
                titleAlign: "start",
                titleOffset: 4
            }]}
        />
    </>)
}

export default HeatmapChart