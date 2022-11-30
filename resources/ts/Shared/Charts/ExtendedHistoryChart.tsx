//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//

import React, { Fragment, useMemo } from "react"
import { ResponsiveBar, BarDatum } from "@nivo/bar"
import { IKeyMetric } from "@/types/key-metric"
import { line } from "d3-shape";
import { Bar } from "@nivo/bar";
import { timeFormat, timeParse } from "d3-time-format"
import { BADRESP } from "dns";

type ExtendedHistoryChartProps = {
    children: React.ReactNode
    metrics: IKeyMetric[]
    metricKey: string
    periodType: string
}

const Circle = ({ bar: { x, y, width, height, color } }) => {

    // console.log(x, y, width, height, color);
    return <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
    // return <circle cx={x + width / 2} cy={y + height / 2} r={4} fill={color} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BAR_MAX_WIDTH = 12

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomBar = ({ bar }: { bar: Bar; }): JSX.Element => {
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
                console.log(bar, bar.y);
                
                return <circle
                    key={bar.key}
                    cx={bar.x + bar.width/2}
                    // cy={yScale(bar.data.data.roe)}
                    cy={bar.y-4}
                    r={4}
                    fill={bar.color}
                    stroke={bar.color}
                    // style={{ pointerEvents: "none" }}
                />
            })}
        </Fragment>
    );
};

const ExtendedHistoryChart: React.FC<ExtendedHistoryChartProps> = (props) => {
    // const c = useMemo(() => Circle, [props.metrics])
    return (
        <>
            <div className="text-center w-96">
                <div className="text-4xl pb-8">{props.children}%</div>
                <div className="h-32 border-solid border-2 border-sky-500">
                    <ResponsiveBar
                        data={props.metrics as unknown as BarDatum[]}
                        indexBy="date"
                        keys={[props.metricKey]}
                        margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                        valueScale={{ type: "linear" }}
                        enableLabel={false}
                        enableGridY={false}
                        axisBottom={null}
                        axisTop={null}
                        axisLeft={null}
                        axisRight={null}
                        animate
                        padding={0.9}
                        colors={{ scheme: "nivo" }}
                        borderRadius={2}
                        layers={["grid", "axes", "bars", Line, "markers", "legends"]}
                    // innerPadding={4}
                        // barComponent={c}
                    // tooltip={({ id, value, color }) => (
                    //     <div
                    //         style={{
                    //             padding: 12,
                    //             color,
                    //             background: "#222222",
                    //         }}
                    //     >
                    //         <span>Look, I'm custom :)</span>
                    //         <br />
                    //         <strong>
                    //             {id}: {(value * 100).toFixed(2)}
                    //         </strong>
                    //     </div>
                    // )}
                    />
                </div>
            </div>
        </>
    )
}

export default ExtendedHistoryChart