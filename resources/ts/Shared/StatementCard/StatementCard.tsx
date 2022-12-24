
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import moneyformat from "@/utils/moneyformat"
import IIncomeStatement from "@/types/income-statement"
import ValueIndicator from "../ValueIndicator/ValueIndicator"
import { calculateCagr } from "@/utils/preparecalc"
import { LineItemChart } from "../Charts"
import { PaletteColors } from "react-palette"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
    isLoading: boolean
    periodType: string
    data: IIncomeStatement[]
    dataKey: string
    palette: PaletteColors
}


function handleZeroAmount(value: number): number {
    return (Math.round(value) == 0) ? 0 : value
}

//
// Statement Card.
//
const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element | null => {
    const { data, caption, children, isLoading, dataKey, periodType } = props

    const fractionDigits = 0

    let fiveYearPerf = 0
    let threeYearPerf = 0
    let oneYearPerf = 0

    if (data && data.length >= 6) {
        // if (dataKey == "netIncome") {
        // console.log(data.map((v) => v[dataKey]));
        // }

        fiveYearPerf = handleZeroAmount(calculateCagr(data, dataKey, 5, periodType))
    }

    if (data && data.length >= 4) {
        threeYearPerf = handleZeroAmount(calculateCagr(data, dataKey, 3, periodType))
    }

    if (data && data.length >= 2) {
        oneYearPerf = handleZeroAmount(calculateCagr(data, dataKey, 1, periodType))
    }

    let value = 0.0
    try {
        if (data) {
            value = data[0][dataKey]
        }
    } catch (error) {
        // Code.       
    }

    const performance = [{ 1: oneYearPerf }, { 3: threeYearPerf }, { 5: fiveYearPerf }]

    return (
        <div className="card bg-base-100 hover:shadow-xl p-8 z-auto">
            <div className="text-center text-5xl">{moneyformat(value)}</div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                {caption}
            </div>
            <div className="card-body p-0 text-center">
                {isLoading ? (<div className="overflow-x-auto text-center">{children}</div>) : (
                    <div className="">
                        <div className="h-14 w-full overflow-visible pb-2">
                            <LineItemChart noLabels={true} periodType={periodType} incomeStatements={data} lineitem={dataKey} palette={props.palette}>
                                {caption}
                            </LineItemChart>
                        </div>
                        <table className="table table-compact w-full text-slate-500 z-0">
                            <tbody>
                                {performance.map((perf) => {
                                    const [key, value] = Object.entries(perf)[0];
                                    return (<>
                                        <tr key={key} className="hover">
                                            <th className="rounded-none">{key} {parseInt(key) > 1 ? "Years" : "Year"}</th>
                                            <td className="rounded-none text-right border-b-0">
                                                <ValueIndicator unit="%">{Number.isNaN(value) ? "N/A" : value.toFixed(fractionDigits)}</ValueIndicator>
                                            </td>
                                        </tr>
                                    </>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>)
                }
            </div>
        </div>
    )
}

export default StatementCard