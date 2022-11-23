//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import moneyformat from "@/utils/moneyformat"
import IIncomeStatement from "@/types/income-statement"
import ValueIndicator from "../ValueIndicator/ValueIndicator"
import yoy from "@/utils/yoy"
import cagr from "@/utils/cagr"
import { Link, usePage } from "@inertiajs/inertia-react"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
    data: IIncomeStatement[]
}

function calculatePerformance(data: IIncomeStatement[], dataKey: string, length: number): number {
    const currentValue = data[0][dataKey]
    const priorValue = data[length][dataKey]

    return yoy(currentValue, priorValue)
}

function calculateCagr(data: IIncomeStatement[], dataKey: string, length: number): number {
    const currentValue = data[0][dataKey]
    const priorValue = data[length][dataKey]

    const r = cagr(priorValue, currentValue, length)

    return r.percentage
}

const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element | null => {
    const { exchange, symbol } = usePage().props
    
    const { caption, data, children } = props

    if (!data) { return null }

    const fractionDigits = 0

    // const symbol = "NVDA"
    // const exchange = "nasdaq"

    let fiveYearPerf = ""
    let threeYearPerf = ""
    let oneYearPerf = ""

    if (data.length === 0) {
        return <></>
    }

    if (data.length >= 6) {
        // fiveYearPerf = calculatePerformance(data, children as string, 5).toFixed(fractionDigits)
        fiveYearPerf = calculateCagr(data, children as string, 5).toFixed(fractionDigits)
    }

    if (data.length >= 4) {
        // threeYearPerf = calculatePerformance(data, children as string, 3).toFixed(fractionDigits)
        threeYearPerf = calculateCagr(data, children as string, 3).toFixed(fractionDigits)
    }

    if (data.length >= 2) {
        // Calculate YoY Performance.
        oneYearPerf = calculatePerformance(data, children as string, 1).toFixed(fractionDigits)
    }

    // get last FY, QTR or TTM.
    const value = data[0][children as string]
    const lineitem = (caption as string).toLocaleLowerCase().split(/\s+/).join("-")
    // const lineitem = "gross-profit"

    return (
        <Link href={route("security.financials.incomestatement.lineitem", {symbol, exchange, lineitem})}>
            <div className="card bg-base-100 hover:shadow-xl p-8">
                <div className="text-center text-5xl">{moneyformat(value)}</div>
                <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                    {caption}
                </div>
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-compact w-full text-slate-500">
                            <tbody>
                                {/* 1 Year */}
                                {oneYearPerf &&
                                    <tr className="hover">
                                        <th className="rounded-none">1 Year</th>
                                        <td className="rounded-none text-right border-b-0">
                                            <ValueIndicator unit="%">{oneYearPerf}</ValueIndicator>
                                        </td>
                                    </tr>
                                }
                                {/* 3 Years */}
                                {threeYearPerf &&
                                    <tr className="hover">
                                        <th className="rounded-none">3 Years</th>
                                        <td className="rounded-none text-right border-b-0">
                                            <ValueIndicator unit="%">{threeYearPerf}</ValueIndicator>
                                        </td>
                                    </tr>
                                }
                                {/* 5 Years */}
                                {fiveYearPerf &&
                                    <tr className="hover">
                                        <th className="rounded-none">5 Years</th>
                                        <td className="rounded-none text-right border-b-0">
                                            <ValueIndicator unit="%">{fiveYearPerf}</ValueIndicator>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default StatementCard