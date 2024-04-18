//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { useMemo } from "react"
import { BarDatum, ResponsiveBar } from "@nivo/bar"
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
    noLabels: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    if (!props.incomeStatements) {
        return null
    }

    props.incomeStatements.map((is: IIncomeStatement) => {
        map.set(is.date, {
            period: is.period,
            calendarYear: is.calendarYear
        })
    })

    const hasLabels = props.noLabels ? false : true
    const margin = hasLabels
        ?  { top: 0, right: 20, bottom: props.periodType != "FY" ? 60 : 20, left: 0 }
        : { top: 0, right: 0, bottom: 0, left: 0 }
    
    const padding = hasLabels ? 0.4 : 0.6

    let tickValues: string[] = []

    if (props.periodType == "TTM") {
        tickValues = useMemo(() => getHighestDates(Array.from(map.keys())), [periodType]);
    } else {
        tickValues = useMemo(() => Array.from(map.keys()), [periodType])
    }

    // console.log(tickValues);
    const parseTime = timeParse("%Y-%m-%d")
    const formatTime = timeFormat("%b-%Y")

    return <ResponsiveBar
        className="z-0"
        data={props.incomeStatements}
        keys={[props.lineitem]}
        indexBy="date"
        margin={margin}
        padding={padding}
        valueScale={{ type: "linear" }}
        colors={props.palette.vibrant}
        animate={true}
        enableLabel={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        borderRadius={props.periodType !== "FY" ? 4 : 2}
        // labelFormat={time:"%Y"}
        axisBottom={!hasLabels ? null : {
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
            // const background = props.palette.darkMuted
            // const color = props.palette.lightVibrant
            const delimterColor = props.palette.lightMuted
            return (
                <>
                    <div className="alert shadow-lg bg-opacity-40 backdrop-blur absolute z-0 w-36">
                        <div className="flex items-center gap-2 w-36">
                            <div className="text-center flex-grow">
                                <div className="min-w-full pb-1">
                                    {/*<div className="align-middle inline-block w-4 h-4" style={{ backgroundColor: color, border: "1px solid " + background }}>
                                    </div>*/}
                                    <div className="inline-block leading-4 align-middle text-slate-500 font-bold">{tmr}</div>
                                </div>
                                <hr style={{border: "1px solid " + delimterColor}}></hr>
                                {/* <hr className="border-1 border-slate-100 pb-1"></hr> */}
                                <div className="font-bold text-2xl mt-1">
                                    {/* TODO: prevent -0% values */}
                                    {moneyformat(dataPoint.value, false, 1)}
                                </div>
                                {/* <div className="text-xs">4.9%</div> */}
                                <div className="uppercase text-sm">{props.children}</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }}
    />
}

export default LineItemChart