//
// Licence
// Copyright (c) 2009-2022 Stefan Martin
// https://github.com/foxkill/planetcapital
// Closed Source
//
import React from "react"
import moneyformat from "@/utils/moneyformat"
import IIncomeStatement from "@/types/income-statement"
import { LineItemAverageKind } from "./lineitem.enum"
import { useSecurity } from "../SecurityContext/SecurityContext"
import getPeriodTypeMap from "@/utils/periodtypemap"
import { calculateCagr, calculateAverage } from "@/utils/preparecalc"

/* eslint-disable indent */
interface IStatementCardAverageProps {
    data: IIncomeStatement[]
    mode: LineItemAverageKind
    lineitem: string
}

const StatementCardAverage: React.FC<IStatementCardAverageProps> = (props): JSX.Element | null => {
    const { periodType } = useSecurity().context
    const { data, mode, lineitem } = props

    if (!data) { return null }

    if (data.length <= 3) { return null }

    const periodTypeMap = getPeriodTypeMap()

    let threeYearPerf = ""
    let caption = ""
    let value = 0

    if (data.length >= 4) {
        switch (mode) {
            case LineItemAverageKind.LAST_YEARS_VALUE:
                threeYearPerf = moneyformat(data[0][lineitem], false, 0) + " " + data[0]["reportedCurrency"]
                caption = `Last ${periodTypeMap[periodType]} Value`
                break
            case LineItemAverageKind.THREE_YEARS_CAGR_VALUE:
                value = calculateCagr(data, lineitem, 3, periodType)
                threeYearPerf = Number.isNaN(value) ? "N/A" : value.toFixed(0) + "%"
                caption = "3-Years Growth (CAGR)"
                break;
            case LineItemAverageKind.THREE_YEARS_AVG_VALUE:
                threeYearPerf = moneyformat(calculateAverage(data, lineitem, periodType == "FY" ? 3 : 3 * 4), false, 0) + " " + data[0]["reportedCurrency"]
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
                    <span className={`${Number.isNaN(value) ? "text-slate-400" : (value > 0) ? "text-ics-green" : "text-ics-red"}`}>{threeYearPerf}</span>
                ) : (threeYearPerf)
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