//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React, { ReactNode } from "react"
import { ResponsiveLine, Layer, CustomLayerProps, PointSymbolProps } from "@nivo/line"
import { DotsItem, useTheme } from "@nivo/core"
import daisyuiColors from "daisyui/src/colors/themes"

interface HistoryChartProperties {
    data: any[]
    ratioShortName: string
}

const CustomSymbol = ({ size, color, borderWidth, borderColor }: PointSymbolProps): ReactNode => (
    <g>
        {/* <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} /> */}
        <circle
            r={size / 3}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={borderColor}
        // fillOpacity={0.35}
        />
    </g>
)

function LastPoint({ points, ...props }: CustomLayerProps): JSX.Element {
    const theme = useTheme()
    const shownPoints = points.slice(-1)

    return (
        <g>
            {shownPoints.map((point) => (
                <DotsItem
                    key={point.id}
                    x={point.x}
                    y={point.y}
                    datum={point.data}
                    symbol={props.pointSymbol}
                    size={props.pointSize}
                    color={point.color}
                    borderWidth={props.pointBorderWidth}
                    borderColor={point.borderColor}
                    label={point.label}
                    labelYOffset={props.pointLabelYOffset}
                    theme={theme}
                />
            ))}
        </g>
    )
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const CustomPoint = (props: CustomLayerProps): ReactNode | null => {
    const { currentPoint } = props;
    // it will show the current point
    if (!currentPoint) {
        return null
    }
    
    const point = currentPoint

    return (
        <DotsItem
            key={point.id}
            x={point.x}
            y={point.y}
            datum={point.data}
            size={props.pointSize ?? 10}
            color={point.color}
            borderWidth={3}
            borderColor={point.borderColor}
            label={point.label}
            labelYOffset={props.pointLabelYOffset}
        />
    )
    // return (
    //     <g>
    //         <circle
    //             fill="#A8EEFF"
    //             r={16}
    //             strokeWidth={borderWidth}
    //             stroke={borderColor}
    //             fillOpacity={0.35}
    //             cx={currentPoint.x}
    //             cy={currentPoint.y}
    //         />
    //         <circle
    //             r={6}
    //             strokeWidth={"4"}
    //             stroke={"#1a6dfc"}
    //             fill={"#A8EEFF"}
    //             fillOpacity={0.85}
    //             cx={currentPoint.x}
    //             cy={currentPoint.y}
    //         />
    //     </g>
    // )
}

const { "[data-theme=light]": theme } = daisyuiColors

const HistoryChart = ({ data, ratioShortName }: HistoryChartProperties): JSX.Element => {
    // Einsatz von Layern
    // https://codesandbox.io/s/fancy-line-chart-3quqe
    // layers = {
    //       [
    //         AlternateBackground,
    //         'grid',
    //         'axes',
    //         'areas',
    //         'lines',
    //         'crosshair',
    //         'slices',
    //         'mesh',
    //         'legends',
    //         LastPoint,
    //       ] as Layer[]
    //     }

    
    console.log(data);
    
    return (<ResponsiveLine
        data={data}
        curve={"monotoneX"}
        // colors={{ scheme: "spectral" }}
        colors={[theme["base-300"], theme.secondary]}
        lineWidth={3}
        // pointColor={{ theme: "background" }}
        pointSize={10}
        pointBorderWidth={2}
        enablePoints={false}
        pointColor="white"
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        // pointSymbol={CustomSymbol}
        enableGridX={false}
        enableGridY={false}
        xFormat="time:%b-%Y"
        // gridXValues={[2016,2017,2018]}
        xScale={{
            type: "time",
            format: "%Y-%m-%d",
            precision: "day",
            useUTC: false
        }}
        yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
        }}
        axisBottom={{
            tickValues: "every year",
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            format: "%Y",
            legendOffset: 32
        }}
        margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        axisTop={null}
        axisLeft={null}
        axisRight={null}
        crosshairType={"cross"}
        enableCrosshair={false}
        useMesh={true}
        // debugMesh
        // enableSlices="x"
        layers={["grid", "markers", "lines", "points", "mesh", "slices", "axes", "crosshair", "slices", CustomPoint] as Layer[]}
        tooltip={({ point }): JSX.Element => {
            return (
                <>
                    <div className="w-40 rounded" style={{ background: "white", padding: "9px 12px", border: "1px solid #ccc" }}>
                        <div className="text-center font-bold">{point.data.d}</div>
                        <hr></hr>
                        <div key={point.id} style={{ padding: "3px 0" }}>
                            {ratioShortName}: <div className="float-right">{point.data.yFormatted}</div>
                        </div>
                    </div>
                </>
            )
        }}
    />)
}

export default HistoryChart