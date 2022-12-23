
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
import calculateAverageGrowth from "@/utils/growth"

interface IStatementCardProperties {
    children: React.ReactNode
    caption: string
    isLoading: boolean
    periodType: string
    data: IIncomeStatement[]
    dataKey: string
}

function calculatePerformance(data: IIncomeStatement[], dataKey: string, length: number, periodType: string): number {
    let index = length

    if (periodType != "FY") {
        index = (length * 4) - 1
    }

    const currentValue = data[0][dataKey]
    const priorValue = data[index][dataKey]

    return yoy(currentValue, priorValue)
}

function calculateCagr(data: IIncomeStatement[], dataKey: string, periods: number, periodType: string): number {
    let index = periods

    if (periodType != "FY") {
        index = (periods << 2)
    }

    const currentValue = data[0][dataKey]
    const priorValue = data[index][dataKey]

    const log = (dataKey == "netIncome" && periods==5)

    if (log) {
        console.log(index, periods, currentValue, priorValue);
    }
    
    const r = cagr(priorValue, currentValue, periods)

    return r.percentage
}


function calculateGrowth(startValue, endValue): number {
    return ((endValue - startValue) / startValue) * 100;
}

function calculateAvgGrowth(data: IIncomeStatement[], dataKey: string, length: number, periodType: string): number {
    let totalGrowth = 0;
    let quarters = (periodType === "FY") ? length : (length << 2)

    const log = (dataKey == "netIncome" && length==5)
    let lastgrowth: number[] = []
    let k = 0
    if (log) {
        // k = 1
        // quarters += k
    }
    for (let i = k; i < quarters; i++) {
        const currentSale = data[i][dataKey]
        let previousSale = data[i + 1][dataKey];
        const growth = calculateGrowth(previousSale, currentSale)
        if (log) {
            lastgrowth.push(growth)
            // console.log(growth.toFixed(0), currentSale, previousSale)
        }
        totalGrowth += growth
    }
    if (log) {
        console.log(data.length, quarters, totalGrowth, lastgrowth);
        
        console.log(data.map((v) => v[dataKey]))
        // console.log(totalGrowth, length, quarters, lastgrowth);
        //    console.log(moneyformat(lastgrowth, false, 1))
        // console.log(data.map(v => (v.netIncome)));

    }
    return (totalGrowth / length)
}

//
// Statement Card.
//
const StatementCard: React.FC<IStatementCardProperties> = (props): JSX.Element | null => {
    const { data, caption, children, isLoading, dataKey, periodType } = props

    const fractionDigits = 0
    // let data = props.data

    let fiveYearPerf = ""
    let threeYearPerf = ""
    let oneYearPerf = ""

    if (data && data.length >= 6) {
        fiveYearPerf = calculateCagr(data, dataKey, 5, periodType).toFixed(fractionDigits)
    }

    if (data && data.length >= 4) {
        threeYearPerf = calculateCagr(data, dataKey, 3, periodType).toFixed(fractionDigits)
    }

    if (data && data.length >= 2) {
        // Calculate AAGR Performance.
        oneYearPerf = calculateCagr(data, dataKey, 1, periodType).toFixed(fractionDigits)
    }

    let value = 0.0
    try {
        if (data) {
            value = data[0][dataKey]
        }
    } catch (error) {
        // Code.       
    }

    return (
        <div className="card bg-base-100 hover:shadow-xl p-8">
            <div className="text-center text-5xl">{moneyformat(value)}</div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
                {caption}
            </div>
            <div className="card-body p-0">
                {isLoading ? (<div className="text-center">{children}</div>) : (
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
                    </div>)
                }
            </div>
        </div>
    )
}

export default StatementCard