//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import moneyformat from "@/utils/moneyformat"
import IIncomeStatement from "@/types/income-statement"
import cagr from "@/utils/cagr"
import { LineItemAverageKind } from "./lineitem.enum"
import { useSecurity } from "../SecurityContext/SecurityContext"

/* eslint-disable indent */

interface IStatementCardAverageProps {
    data: IIncomeStatement[]
    mode: LineItemAverageKind
    lineitem: string
}

function calculateAverage(data: IIncomeStatement[], dataKey: string, length: number): number {
    let sum = 0
    for (let i = 0; i < length; i++) {
        sum += data[i][dataKey]
    }

    return sum / length
}

function calculateCagr(data: IIncomeStatement[], dataKey: string, length: number): number {
    const currentValue = data[0][dataKey]
    const priorValue = data[length][dataKey]

    const r = cagr(priorValue, currentValue, length)

    return r.percentage
}

const growthTypeMap = {
    "FY": "Annual",
    "TTM": "TTM",
    "QTR": "Quarterly"
}

const StatementCardAverage: React.FC<IStatementCardAverageProps> = (props): JSX.Element | null => {
    const { periodType } = useSecurity().context
    const { data, mode, lineitem } = props

    if (!data) { return null }

    if (data.length <= 3) {
        return <></>
    }

    let threeYearPerf = ""
    let caption = ""
    let value = 0

    if (data.length >= 4) {
        switch (mode) {
            case LineItemAverageKind.LAST_YEARS_VALUE:
                threeYearPerf = moneyformat(data[0][lineitem], false, 0) + " " + data[0]["reportedCurrency"]
                caption = `Last ${growthTypeMap[periodType]} Growth`
                break
            case LineItemAverageKind.THREE_YEARS_CAGR_VALUE:
                value = calculateCagr(data, lineitem, 3)
                threeYearPerf =  value.toFixed(0) + "%"
                caption = "3-Years Growth (CAGR)"
                break;
            case LineItemAverageKind.THREE_YEARS_AVG_VALUE:
                threeYearPerf = moneyformat(calculateAverage(data, lineitem, 3), false, 0) + " " + data[0]["reportedCurrency"]
                caption = "3-Years Average"
                break;
            default:
                break;
        }
    }

    // get last FY, QTR or TTM.
    // const lineitem = (caption as string).toLocaleLowerCase().split(/\s+/).join("-")
    // const lineitem = "gross-profit"

    return (
        <div className="card bg-base-100 hover:shadow-xl p-8">
            <div className="text-center text-5xl">
                {(mode == LineItemAverageKind.THREE_YEARS_CAGR_VALUE) ? (
                    <span className={`${value > 0 ? "text-ics-green": "text-ics-red"}`}>{threeYearPerf}</span>
                ):(threeYearPerf)
                }
            </div>
            <div className="inline-block align-top uppercase leading-6 text-center pb-4 text-base font-bold">
            </div>
            <div className="card-body p-0 uppercase font-bold text-center">
                {caption}
            </div>
        </div>
    )
}

export default StatementCardAverage