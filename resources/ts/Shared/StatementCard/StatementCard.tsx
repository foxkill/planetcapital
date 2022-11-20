//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import IIncomeStatement from "@/types/income-statement"
import moneyformat from "@/utils/moneyformat"
import React from "react"
import ValueIndicator from "../ValueIndicator/ValueIndicator"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
    data: IIncomeStatement[]
}

function calculatePerformance(data: IIncomeStatement[], dataKey: string, length: number): number {
    for (let index = 0; index < length; index++) {
        const perf = data[index][dataKey]
        // console.log(perf);
    }
    return 0
}
const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element => {
    const { caption, data, children } = props

    let fiveYearPerf = 0.0
    let threeYearPerf = 0.0
    let oneYearPerf = 0.0

    if (data.length === 0) {
        return <></>
    }

    if (data.length >= 5) {
        fiveYearPerf = calculatePerformance(data, children as string, 5) 
    }

    if (data.length >= 3) {
        threeYearPerf = calculatePerformance(data, children as string, 3) 
    }

    if (data.length >= 2) {
        oneYearPerf = calculatePerformance(data, children as string, 1) 
    }

    // last FY, QTR or TTM
    const value = data[0][children as string]
    
    return (
        <div className="card bg-base-100 hover:shadow-xl p-4">
            <div className="text-center text-5xl">{moneyformat(value)}</div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                {caption}
            </div>
            <div className="card-body p-0">
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full text-slate-500">
                        <tbody>
                            {/* 1 Year */}
                            <tr className="hover">
                                <th className="rounded-none">1 Year</th>
                                <td className="rounded-none text-right">
                                    <ValueIndicator unit="%">{oneYearPerf}</ValueIndicator>
                                </td>
                            </tr>
                            {/* 3 Years */}
                            <tr className="hover">
                                <th>3 Years</th>
                                <td>
                                    <ValueIndicator unit="%">{threeYearPerf}</ValueIndicator>
                                </td>
                            </tr>
                            {/* 5 Years */}
                            <tr className="hover">
                                <th className="rounded-none">5 Years</th>
                                <td className="rounded-none">
                                    <ValueIndicator unit="%">{fiveYearPerf}</ValueIndicator>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StatementCard