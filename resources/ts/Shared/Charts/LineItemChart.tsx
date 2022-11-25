//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import { ResponsiveBar } from "@nivo/bar"
import IIncomeStatement from "@/types/income-statement"

type LineItemChartProps = {
    children?: React.ReactNode
    incomeStatements: IIncomeStatement[]
}

const LineItemChart: React.FC<LineItemChartProps> = (props) => {
    const c = props.children
    const data = [
        {
            "country": "AD",
            "hot dog": 125,
            "hot dogColor": "hsl(164, 70%, 50%)",
            "burger": 101,
            "burgerColor": "hsl(70, 70%, 50%)",
            "sandwich": 1,
            "sandwichColor": "hsl(131, 70%, 50%)",
            "kebab": 169,
            "kebabColor": "hsl(67, 70%, 50%)",
            "fries": 163,
            "friesColor": "hsl(291, 70%, 50%)",
            "donut": 131,
            "donutColor": "hsl(52, 70%, 50%)"
        },
        {
            "country": "AE",
            "hot dog": 192,
            "hot dogColor": "hsl(340, 70%, 50%)",
            "burger": 130,
            "burgerColor": "hsl(152, 70%, 50%)",
            "sandwich": 53,
            "sandwichColor": "hsl(262, 70%, 50%)",
            "kebab": 78,
            "kebabColor": "hsl(13, 70%, 50%)",
            "fries": 132,
            "friesColor": "hsl(144, 70%, 50%)",
            "donut": 159,
            "donutColor": "hsl(6, 70%, 50%)"
        },
        {
            "country": "AF",
            "hot dog": 54,
            "hot dogColor": "hsl(253, 70%, 50%)",
            "burger": 17,
            "burgerColor": "hsl(160, 70%, 50%)",
            "sandwich": 116,
            "sandwichColor": "hsl(253, 70%, 50%)",
            "kebab": 62,
            "kebabColor": "hsl(298, 70%, 50%)",
            "fries": 145,
            "friesColor": "hsl(223, 70%, 50%)",
            "donut": 37,
            "donutColor": "hsl(186, 70%, 50%)"
        },
        {
            "country": "AG",
            "hot dog": 118,
            "hot dogColor": "hsl(295, 70%, 50%)",
            "burger": 104,
            "burgerColor": "hsl(78, 70%, 50%)",
            "sandwich": 83,
            "sandwichColor": "hsl(263, 70%, 50%)",
            "kebab": 155,
            "kebabColor": "hsl(59, 70%, 50%)",
            "fries": 116,
            "friesColor": "hsl(238, 70%, 50%)",
            "donut": 19,
            "donutColor": "hsl(187, 70%, 50%)"
        },
        {
            "country": "AI",
            "hot dog": 13,
            "hot dogColor": "hsl(99, 70%, 50%)",
            "burger": 63,
            "burgerColor": "hsl(272, 70%, 50%)",
            "sandwich": 153,
            "sandwichColor": "hsl(92, 70%, 50%)",
            "kebab": 140,
            "kebabColor": "hsl(299, 70%, 50%)",
            "fries": 0,
            "friesColor": "hsl(172, 70%, 50%)",
            "donut": 103,
            "donutColor": "hsl(345, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 40,
            "hot dogColor": "hsl(54, 70%, 50%)",
            "burger": 135,
            "burgerColor": "hsl(68, 70%, 50%)",
            "sandwich": 103,
            "sandwichColor": "hsl(165, 70%, 50%)",
            "kebab": 61,
            "kebabColor": "hsl(249, 70%, 50%)",
            "fries": 84,
            "friesColor": "hsl(79, 70%, 50%)",
            "donut": 13,
            "donutColor": "hsl(16, 70%, 50%)"
        },
        {
            "country": "AM",
            "hot dog": 1,
            "hot dogColor": "hsl(329, 70%, 50%)",
            "burger": 23,
            "burgerColor": "hsl(331, 70%, 50%)",
            "sandwich": 118,
            "sandwichColor": "hsl(188, 70%, 50%)",
            "kebab": 72,
            "kebabColor": "hsl(156, 70%, 50%)",
            "fries": 62,
            "friesColor": "hsl(262, 70%, 50%)",
            "donut": 59,
            "donutColor": "hsl(202, 70%, 50%)"
        }
    ]
    return <ResponsiveBar
        data={data}
        keys={
            [
                "hot dog",
                "burger",
                "sandwich",
                "kebab",
                "fries",
                "donut"
            ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={
            [
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
        fill={
            [
                {
                    match: {
                        id: "fries"
                    },
                    id: "dots"
                },
                {
                    match: {
                        id: "sandwich"
                    },
                    id: "lines"
                }
            ]}
        borderColor={{
            from: "color",
            modifiers: [
                [
                    "darker",
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: "color",
            modifiers: [
                [
                    "darker",
                    1.6
                ]
            ]
        }}
        legends={
            [
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
    />
}

export default LineItemChart