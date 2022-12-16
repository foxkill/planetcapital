//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useMemo } from "react"
import { ResponsiveBar } from "@nivo/bar"
import IIncomeStatement from "@/types/income-statement"
import moneyformat from "@/utils/moneyformat"
import { PaletteColors } from "react-palette"
import { timeFormat, timeParse } from "d3-time-format"

type LineItemChartProps = {
    children?: React.ReactNode
    periodType: string
    incomeStatements: IIncomeStatement[]
    lineitem: string
    palette: PaletteColors
}

interface IAxisData {
    period: string
    calendarYear: string
}

function getHighestDates(dates: string[]): string[] {
    const yearToDates = {};

    const parseTime = timeParse("%Y-%m-%d")

    dates.forEach(date => {
        const year = date.slice(0, 4);
        if (!yearToDates[year]) {
            yearToDates[year] = date;
        } else {
            if (parseTime(yearToDates[year])!.valueOf() < parseTime(date)!.valueOf()) {
                yearToDates[year] = date
            }
        }
    });

    return Object.values(yearToDates);
}
const LineItemChart: React.FC<LineItemChartProps> = (props) => {
    const periodType = props.periodType
    const map = new Map()
    props.incomeStatements.map((is: IIncomeStatement) => {
        map.set(is.date, {
            period: is.period,
            calendarYear: is.calendarYear
        })
    })

    let tickValues: string[] = []

    if (props.periodType == "TTM") {
        tickValues = useMemo(() => getHighestDates(Array.from(map.keys())), [periodType]);
    } else {
        tickValues = useMemo(() => Array.from(map.keys()), [periodType])
    }

    console.log(tickValues);
    

    const parseTime = timeParse("%Y-%m-%d")
    const formatTime = timeFormat("%b-%Y")

    return <ResponsiveBar
        data={props.incomeStatements}
        keys={[props.lineitem]}
        indexBy="date"
        margin={{ top: 0, right: 20, bottom: props.periodType != "FY" ? 60 : 20, left: 0 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        colors={props.palette.vibrant}
        animate={true}
        enableLabel={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        borderRadius={props.periodType !== "FY" ? 4 : 2}
        // labelFormat={time:"%Y"}
        axisBottom={{
            // tickValues: props.periodType == "TTM" ? 4 : "every year",
            tickValues: tickValues,
            tickSize: 0,
            tickPadding: 10,
            tickRotation: props.periodType !== "FY" ? 45 : 0,
            format: (d: string): string => {
                const v = map.get(d)
                if (!v) { return "" }
                return v.calendarYear + " " + v.period
            }
        }}
        // label={(d): number => {
        //     console.log(d);
        //     return d.value
        // }}
        axisLeft={null}
        tooltip={(dataPoint): JSX.Element => {
            const timerange = parseTime((dataPoint.data as unknown as IIncomeStatement).date)
            if (null === timerange) {
                return <></>
            }
            const tmr = formatTime(timerange)
            const background = props.palette.darkMuted
            const color = props.palette.lightVibrant
            const delimterColor = props.palette.lightMuted
            return (
                <div className="text-center pt-2 pl-8 pr-8 rounded" style={{ color, background }}>
                    {tmr}
                    <hr style={{ border: `1px solid ${delimterColor}`, marginBottom: "8px" }} />
                    <div className="font-bold text-2xl !leading-none p-0 m-0">{moneyformat(dataPoint.value, false, 1)}
                    </div>
                    <div className="uppercase text-xs pb-2">{props.children}</div>
                </div>
            )
        }}
    />
}

export default LineItemChart