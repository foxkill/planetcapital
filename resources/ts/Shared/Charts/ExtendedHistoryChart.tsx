//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React, { Fragment } from "react"
import { ResponsiveBar, BarDatum } from "@nivo/bar"
import { IKeyMetric } from "@/types/key-metric"
import { timeFormat, timeParse } from "d3-time-format"
import { PaletteColors } from "react-palette";
import IRatio from "@/types/ratio";
import moneyformat from "@/utils/moneyformat";
import { FinMetricKind, FinMetricType } from "@/types/finmetrickind";

interface ExtendedHistoryChartProps {
    children?: React.ReactNode
    metric: string
    metrics: IKeyMetric[] | IRatio[]
    metricKey: string
    metricKind: FinMetricType
    periodType: string
    palette: PaletteColors
}

function Circle({ bar: { x, y, width, height, color } }): JSX.Element {

    // console.log(x, y, width, height, color);
    return <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />;
    // return <circle cx={x + width / 2} cy={y + height / 2} r={4} fill={color} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BAR_MAX_WIDTH = 12

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomBar = ({ bar }: { bar: Bar; }): JSX.Element => {
    return <></>
    // const w = width > BAR_MAX_WIDTH ? BAR_MAX_WIDTH : width;
    // return (
    //     <rect
    //         x={x + width / 2 - w / 2}
    //         y={y}
    //         width={w}
    //         height={height}
    //         rx={Math.min(w, height) / 2}
    //         fill={color} />
    // );
}

// const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
// const areaColor = "#0095ff";

const Line = ({ bars, xScale, yScale }): JSX.Element => {
    // const lineGenerator = line()
    //     .x((bar) => xScale(bar.data.index) + bar.width / 2)
    //     .y((bar) => yScale(bar.data.data.v1));

    return (
        <Fragment>
            {/* <path
                d={lineGenerator(bars)}
                fill="none"
                stroke={lineColor}
                style={{ pointerEvents: "none" }}
            /> */}
            {bars.map((bar) => {
                const signed = bar.data.value < 0.0 ? bar.absY - bar.y : bar.y
                // console.log(bar, signed);
                return <circle
                    key={bar.key}
                    cx={bar.x + bar.width / 2}
                    cy={signed}
                    r={4}
                    fill={bar.color}
                    stroke={bar.color}
                    style={{ pointerEvents: "auto" }}
                />
            })}
        </Fragment>
    );
};

const ExtendedHistoryChart: React.FC<ExtendedHistoryChartProps> = (props) => {
    if (!props.metrics || props.metrics.length === 0) {
        return null
    }

    let lastValue = 0
    try {
        lastValue = props.metrics[0][props.metricKey] ?? 0
    } catch (error) {
        console.log(error);
    }

    const parseTime = timeParse("%Y-%m-%d")
    const formatTimeYear = timeFormat("%Y")
    const formatTimeDefault = timeFormat("%b-%Y")

    return (
        <>
            <div className="text-4xl pb-6">{
                (props.metricKind !== FinMetricKind.INCOME) && (props.metricKind !== FinMetricKind.CASH)
                    ? ((lastValue * 100).toFixed(1) + "%")
                    : moneyformat(lastValue, false, 1)
            }
            </div>
            <div className="h-32 w-80 min-w-full">
                <ResponsiveBar
                    data={props.metrics as unknown as BarDatum[]}
                    indexBy="date"
                    keys={[props.metricKey]}
                    margin={{ top: 0, right: 0, bottom: 5, left: 0 }}
                    // valueScale={{ type: "symlog" }}
                    valueScale={{ type: "linear" }}
                    enableLabel={false}
                    enableGridY={false}
                    axisBottom={null}
                    axisTop={null}
                    axisLeft={null}
                    axisRight={null}
                    animate
                    padding={0.7}
                    colors={[props.palette.vibrant!]}
                    borderRadius={2}
                    // layers={["grid", "axes", "bars", "markers", "legends"]}
                    // innerPadding={4}
                    // barComponent={c}
                    tooltip={(dataPoint): JSX.Element => {
                        const timerange = parseTime((dataPoint.data as unknown as IKeyMetric).date)

                        if (null === timerange) {
                            return <></>
                        }

                        let tmr = ""
                        const period = (dataPoint.data as unknown as IKeyMetric).period

                        switch (period) {
                            case "FY":
                                tmr = period + " " + formatTimeYear(timerange)
                                break
                            default:
                                tmr = formatTimeDefault(timerange) + " " + period
                        }

                        // const period = formatTimeDefault(timerange) + " " + (dataPoint.data as  any as IKeyMetric).period
                        // const tmr = formatTimeQT(timerange) + " " + dataPoint.data.period
                        // const delimiterColor = props.palette.lightMuted
                        const background = props.palette.darkMuted
                        const color = props.palette.lightVibrant

                        return (
                            <>
                                <div className="alert shadow-lg bg-opacity-10 backdrop-blur">
                                    <div className="flex items-center gap-2">
                                        <div className="text-center">
                                            <div className="min-w-full pb-1">
                                                <div className="align-middle inline-block w-4 h-4" style={{ backgroundColor: color, border: "1px solid " + background }}>
                                                </div>
                                                <div className="inline-block leading-4 align-middle indent-2">{tmr}</div>
                                            </div>
                                            <div className="text-xs pb-2 text-base-500">Historical Value</div>
                                            {/* <div>Historical Value</div> */}
                                            <hr className="border-1 border-slate-300 pb-1"></hr>
                                            <div className="font-bold">
                                                {/* TODO: prevent -0% values */}
                                                {
                                                    (props.metricKind !== FinMetricKind.INCOME) &&
                                                        (props.metricKind !== FinMetricKind.CASH)
                                                        ? (dataPoint.value * 100).toFixed(2) + "%"
                                                        : moneyformat(dataPoint.value, false, 0)
                                                }
                                            </div>
                                            <span className="uppercase">{props.metric}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }}
                />
            </div>
        </>
    )
}

export default ExtendedHistoryChart